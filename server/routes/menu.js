import express from 'express';
import { db } from '../db.js';

const router = express.Router();

// GET all categories
router.get('/categories', (req, res) => {
  try {
    const categories = db.prepare('SELECT * FROM categories ORDER BY display_order ASC').all();
    res.json({ success: true, data: categories });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET all menu items (optionally grouped or filtered)
router.get('/items', (req, res) => {
  try {
    const { category, featured } = req.query;
    let query = 'SELECT * FROM menu_items WHERE 1=1';
    const params = [];

    if (category) {
      query += ' AND category_slug = ?';
      params.push(category);
    }
    if (featured === 'true' || featured === '1') {
      query += ' AND is_featured = 1';
    }

    query += ' ORDER BY display_order ASC, id ASC';
    const items = db.prepare(query).all(...params);

    // Format tags
    const formatted = items.map(item => ({
      ...item,
      tags: item.tags ? item.tags.split(',').filter(Boolean) : [],
      is_featured: Boolean(item.is_featured),
      is_available: Boolean(item.is_available)
    }));

    res.json({ success: true, data: formatted });
  } catch (error) {
    console.error('Error fetching menu items:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET full menu grouped by category
router.get('/full', (req, res) => {
  try {
    const categories = db.prepare('SELECT * FROM categories ORDER BY display_order ASC').all();
    const items = db.prepare('SELECT * FROM menu_items ORDER BY display_order ASC, id ASC').all();

    const grouped = categories.map(cat => ({
      ...cat,
      items: items
        .filter(i => i.category_slug === cat.slug)
        .map(item => ({
          ...item,
          tags: item.tags ? item.tags.split(',').filter(Boolean) : [],
          is_featured: Boolean(item.is_featured),
          is_available: Boolean(item.is_available)
        }))
    }));

    res.json({ success: true, data: grouped });
  } catch (error) {
    console.error('Error fetching full menu:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST add menu item
router.post('/items', (req, res) => {
  try {
    const {
      category_slug, slug, name_am, name_en, description_am,
      description_en, price, is_featured, is_available, tags, image
    } = req.body;

    if (!category_slug || !name_am || !price) {
      return res.status(400).json({ success: false, error: 'Category, Amharic name, and price are required.' });
    }

    const itemSlug = slug || (name_en ? name_en.toLowerCase().replace(/[^a-z0-9]+/g, '-') : `item-${Date.now()}`);

    const stmt = db.prepare(`
      INSERT INTO menu_items (
        category_slug, slug, name_am, name_en, description_am,
        description_en, price, is_featured, is_available, tags, image
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const result = stmt.run(
      category_slug,
      itemSlug,
      name_am,
      name_en || name_am,
      description_am || '',
      description_en || '',
      Number(price),
      is_featured ? 1 : 0,
      is_available !== false ? 1 : 0,
      Array.isArray(tags) ? tags.join(',') : (tags || ''),
      image || null
    );

    res.status(201).json({ success: true, id: result.lastInsertRowid });
  } catch (error) {
    console.error('Error adding menu item:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// PUT update menu item
router.put('/items/:id', (req, res) => {
  try {
    const { id } = req.params;
    const {
      name_am, name_en, description_am, description_en,
      price, is_featured, is_available, tags, category_slug
    } = req.body;

    const existing = db.prepare('SELECT * FROM menu_items WHERE id = ?').get(id);
    if (!existing) {
      return res.status(404).json({ success: false, error: 'Menu item not found.' });
    }

    const stmt = db.prepare(`
      UPDATE menu_items SET
        name_am = COALESCE(?, name_am),
        name_en = COALESCE(?, name_en),
        description_am = COALESCE(?, description_am),
        description_en = COALESCE(?, description_en),
        price = COALESCE(?, price),
        is_featured = COALESCE(?, is_featured),
        is_available = COALESCE(?, is_available),
        tags = COALESCE(?, tags),
        category_slug = COALESCE(?, category_slug)
      WHERE id = ?
    `);

    stmt.run(
      name_am !== undefined ? name_am : null,
      name_en !== undefined ? name_en : null,
      description_am !== undefined ? description_am : null,
      description_en !== undefined ? description_en : null,
      price !== undefined ? Number(price) : null,
      is_featured !== undefined ? (is_featured ? 1 : 0) : null,
      is_available !== undefined ? (is_available ? 1 : 0) : null,
      tags !== undefined ? (Array.isArray(tags) ? tags.join(',') : tags) : null,
      category_slug !== undefined ? category_slug : null,
      id
    );

    res.json({ success: true, message: 'Item updated successfully.' });
  } catch (error) {
    console.error('Error updating menu item:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// DELETE menu item
router.delete('/items/:id', (req, res) => {
  try {
    const { id } = req.params;
    db.prepare('DELETE FROM menu_items WHERE id = ?').run(id);
    res.json({ success: true, message: 'Item deleted.' });
  } catch (error) {
    console.error('Error deleting menu item:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
