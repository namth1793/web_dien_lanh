const express = require('express');
const router = express.Router();
const { db } = require('../db/database');

router.post('/', (req, res) => {
  const { customer_name, customer_phone, customer_address, items, total, note } = req.body;
  if (!customer_name || !customer_phone || !items) return res.status(400).json({ error: 'Thiếu thông tin đơn hàng' });
  const result = db.prepare('INSERT INTO orders (customer_name,customer_phone,customer_address,items,total,note) VALUES (?,?,?,?,?,?)').run(customer_name, customer_phone, customer_address||'', JSON.stringify(items), total, note||'');
  res.json({ success: true, orderId: result.lastInsertRowid, message: 'Đặt hàng thành công! Chúng tôi sẽ liên hệ xác nhận.' });
});

router.get('/', (req, res) => {
  res.json(db.prepare('SELECT * FROM orders ORDER BY created_at DESC').all());
});

module.exports = router;
