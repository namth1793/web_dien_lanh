const express = require('express');
const router = express.Router();
const { db } = require('../../db/database');
const auth = require('../../middleware/auth');

router.get('/', auth, (req, res) => {
  const { status } = req.query;
  let query = 'SELECT * FROM orders WHERE 1=1';
  const params = [];
  if (status) { query += ' AND status = ?'; params.push(status); }
  query += ' ORDER BY id DESC';
  res.json(db.prepare(query).all(...params));
});

router.put('/:id/status', auth, (req, res) => {
  const { status } = req.body;
  const allowed = ['pending', 'confirmed', 'shipping', 'done', 'cancelled'];
  if (!allowed.includes(status)) return res.status(400).json({ error: 'Trạng thái không hợp lệ' });
  db.prepare('UPDATE orders SET status = ? WHERE id = ?').run(status, req.params.id);
  res.json({ success: true });
});

router.delete('/:id', auth, (req, res) => {
  db.prepare('DELETE FROM orders WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

module.exports = router;
