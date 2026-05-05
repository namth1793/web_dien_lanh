const express = require('express');
const router = express.Router();
const { db } = require('../db/database');

router.post('/', (req, res) => {
  const { name, phone, email, address, message, service } = req.body;
  if (!name || !phone) return res.status(400).json({ error: 'Vui lòng điền tên và số điện thoại' });
  db.prepare('INSERT INTO contacts (name,phone,email,address,message,service) VALUES (?,?,?,?,?,?)').run(name, phone, email||'', address||'', message||'', service||'');
  res.json({ success: true, message: 'Cảm ơn bạn! Chúng tôi sẽ liên hệ sớm nhất.' });
});

router.get('/', (req, res) => {
  res.json(db.prepare('SELECT * FROM contacts ORDER BY created_at DESC').all());
});

module.exports = router;
