import express from 'express';
import { db } from '../db.js';

const router = express.Router();

function getAddisAbabaStatus() {
  // Current time in Africa/Addis_Ababa
  const now = new Date();
  const options = { timeZone: 'Africa/Addis_Ababa', hour12: false, hour: '2-digit', minute: '2-digit' };
  const formatter = new Intl.DateTimeFormat([], options);
  const parts = formatter.format(now).split(':');
  const currentHour = parseInt(parts[0], 10);
  const currentMinute = parseInt(parts[1], 10);
  const currentTotalMinutes = currentHour * 60 + currentMinute;

  // Operating hours: 08:00 (480 mins) to 22:00 (1320 mins)
  const openMinutes = 8 * 60;   // 08:00
  const closeMinutes = 22 * 60; // 22:00

  const isOpen = currentTotalMinutes >= openMinutes && currentTotalMinutes < closeMinutes;

  return {
    isOpen,
    currentTime: `${String(currentHour).padStart(2, '0')}:${String(currentMinute).padStart(2, '0')}`,
    opensAt: '08:00',
    closesAt: '22:00',
    status_am: isOpen ? 'አሁን ክፍት ነው (እስከ 22:00 / 4:00 ማታ)' : 'አሁን ተዘግቷል (ነገ በ 08:00 / 2:00 ጠዋት ይከፈታል)',
    status_en: isOpen ? 'Open Now (until 10:00 PM)' : 'Closed Now (Opens at 08:00 AM)',
    timezone: 'Africa/Addis_Ababa (EAT, UTC+3)'
  };
}

// GET restaurant info
router.get('/', (req, res) => {
  try {
    const row = db.prepare('SELECT value_json FROM site_info WHERE key = ?').get('general');
    const info = row ? JSON.parse(row.value_json) : {};
    const liveStatus = getAddisAbabaStatus();

    res.json({
      success: true,
      data: {
        ...info,
        live_status: liveStatus
      }
    });
  } catch (error) {
    console.error('Error fetching restaurant info:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET live status only
router.get('/status', (req, res) => {
  res.json({
    success: true,
    data: getAddisAbabaStatus()
  });
});

export default router;
