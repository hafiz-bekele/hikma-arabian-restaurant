import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = path.join(__dirname, '..', 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, 'hikma_restaurant.db');
export const db = new DatabaseSync(dbPath);

// Enable WAL mode & foreign keys
db.exec(`
  PRAGMA journal_mode = WAL;
  PRAGMA foreign_keys = ON;

  CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT UNIQUE NOT NULL,
    name_am TEXT NOT NULL,
    name_en TEXT NOT NULL,
    display_order INTEGER DEFAULT 0,
    icon TEXT
  );

  CREATE TABLE IF NOT EXISTS menu_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category_slug TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    name_am TEXT NOT NULL,
    name_en TEXT NOT NULL,
    description_am TEXT,
    description_en TEXT,
    price INTEGER NOT NULL,
    is_featured INTEGER DEFAULT 0,
    is_available INTEGER DEFAULT 1,
    tags TEXT,
    image TEXT,
    display_order INTEGER DEFAULT 0,
    FOREIGN KEY (category_slug) REFERENCES categories (slug) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS reservations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    date TEXT NOT NULL,
    time TEXT NOT NULL,
    guests INTEGER NOT NULL,
    notes TEXT,
    status TEXT DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS site_info (
    key TEXT PRIMARY KEY,
    value_json TEXT NOT NULL
  );
`);

console.log(`[Database] SQLite initialized at ${dbPath}`);
