const express = require('express');
const router = express.Router();
const { db } = require('../../db/database');
const auth = require('../../middleware/auth');
const { cloudinary } = require('../../utils/cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

const settingsStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'dien-lanh-settings',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ quality: 'auto' }],
  },
});
const upload = multer({ storage: settingsStorage, limits: { fileSize: 10 * 1024 * 1024 } });

router.get('/', auth, (req, res) => {
  try {
    const rows = db.prepare('SELECT key, value FROM settings').all();
    const result = {};
    rows.forEach(r => { result[r.key] = r.value; });
    res.json(result);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post('/banner', auth, upload.single('image'), (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'Thiếu file ảnh' });
    const url = req.file.path;
    db.prepare("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)").run('banner_url', url);
    res.json({ url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post('/logo', auth, upload.single('image'), (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'Thiếu file ảnh' });
    const url = req.file.path;
    db.prepare("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)").run('logo_url', url);
    res.json({ url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
