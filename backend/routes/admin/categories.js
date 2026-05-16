const express = require('express');
const router = express.Router();
const { db } = require('../../db/database');
const auth = require('../../middleware/auth');

router.get('/', auth, (req, res) => {
  res.json(db.prepare('SELECT * FROM categories ORDER BY sort_order ASC').all());
});

router.post('/', auth, (req, res) => {
  try {
    const { name, slug, icon, sort_order } = req.body;
    if (!name || !slug) return res.status(400).json({ error: 'Thiếu tên hoặc slug' });
    db.prepare('INSERT INTO categories (name,slug,icon,sort_order) VALUES (?,?,?,?)').run(name, slug, icon || '', sort_order || 0);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.put('/:id', auth, (req, res) => {
  try {
    const { name, icon, sort_order } = req.body;
    db.prepare('UPDATE categories SET name=?,icon=?,sort_order=? WHERE id=?').run(name, icon || '', sort_order || 0, req.params.id);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.delete('/:id', auth, (req, res) => {
  try {
    const count = db.prepare('SELECT COUNT(*) as c FROM products WHERE category_id = ?').get(req.params.id);
    if (count.c > 0) return res.status(400).json({ error: 'Danh mục còn sản phẩm, không thể xóa' });
    db.prepare('DELETE FROM categories WHERE id = ?').run(req.params.id);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
