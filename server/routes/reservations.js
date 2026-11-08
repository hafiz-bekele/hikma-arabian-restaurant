import express from 'express';
import { db } from '../db.js';

const router = express.Router();

// GET all reservations (for owner/admin)
router.get('/', (req, res) => {
  try {
    const reservations = db.prepare('SELECT * FROM reservations ORDER BY id DESC').all();
    res.json({ success: true, data: reservations });
  } catch (error) {
    console.error('Error fetching reservations:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST new reservation
router.post('/', (req, res) => {
  try {
    const { name, phone, date, time, guests, notes } = req.body;

    if (!name || !phone || !date || !time) {
      return res.status(400).json({
        success: false,
        error: 'ስም፣ ስልክ፣ ቀን እና ሰዓት አስፈላጊ ናቸው (Name, phone, date, and time are required).'
      });
    }

    const stmt = db.prepare(`
      INSERT INTO reservations (name, phone, date, time, guests, notes, status)
      VALUES (?, ?, ?, ?, ?, ?, 'pending')
    `);

    const result = stmt.run(
      name.trim(),
      phone.trim(),
      date,
      time,
      Number(guests) || 2,
      notes ? notes.trim() : ''
    );

    res.status(201).json({
      success: true,
      data: {
        id: result.lastInsertRowid,
        name,
        phone,
        date,
        time,
        guests,
        status: 'pending'
      }
    });
  } catch (error) {
    console.error('Error saving reservation:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// PATCH reservation status
router.patch('/:id/status', (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['pending', 'confirmed', 'cancelled', 'completed'].includes(status)) {
      return res.status(400).json({ success: false, error: 'Invalid status.' });
    }

    db.prepare('UPDATE reservations SET status = ? WHERE id = ?').run(status, id);
    res.json({ success: true, message: `Reservation status changed to ${status}.` });
  } catch (error) {
    console.error('Error updating reservation status:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
