const express = require('express');
const router = express.Router();
const { db } = require('../db/database');

router.get('/', (req, res) => {
  const { category, limit = 10, offset = 0 } = req.query;
  let query = 'SELECT * FROM news WHERE 1=1';
  const params = [];
  if (category) { query += ' AND category = ?'; params.push(category); }
  query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
  params.push(parseInt(limit), parseInt(offset));
  res.json(db.prepare(query).all(...params));
});

router.get('/:slug', (req, res) => {
  const article = db.prepare('SELECT * FROM news WHERE slug = ?').get(req.params.slug);
  if (!article) return res.status(404).json({ error: 'Not found' });
  const related = db.prepare('SELECT * FROM news WHERE id != ? ORDER BY created_at DESC LIMIT 3').all(article.id);
  res.json({ ...article, related });
});

module.exports = router;
