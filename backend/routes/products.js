const express = require('express');
const router = express.Router();
const { db } = require('../db/database');

router.get('/', (req, res) => {
  const { category, brand, is_featured, is_sale, search, limit = 20, offset = 0 } = req.query;
  let query = 'SELECT p.*, c.name as category_name, c.slug as category_slug FROM products p LEFT JOIN categories c ON p.category_id = c.id WHERE 1=1';
  const params = [];
  if (category) { query += ' AND c.slug = ?'; params.push(category); }
  if (brand) { query += ' AND p.brand = ?'; params.push(brand); }
  if (is_featured) { query += ' AND p.is_featured = 1'; }
  if (is_sale) { query += ' AND p.is_sale = 1'; }
  if (search) { query += ' AND p.name LIKE ?'; params.push(`%${search}%`); }
  query += ' ORDER BY p.is_featured DESC, p.id DESC LIMIT ? OFFSET ?';
  params.push(parseInt(limit), parseInt(offset));
  const products = db.prepare(query).all(...params);
  res.json(products);
});

router.get('/brands', (req, res) => {
  const brands = db.prepare('SELECT DISTINCT brand FROM products ORDER BY brand').all();
  res.json(brands.map(b => b.brand));
});

router.get('/:slug', (req, res) => {
  const product = db.prepare('SELECT p.*, c.name as category_name, c.slug as category_slug FROM products p LEFT JOIN categories c ON p.category_id = c.id WHERE p.slug = ?').get(req.params.slug);
  if (!product) return res.status(404).json({ error: 'Not found' });
  const related = db.prepare('SELECT * FROM products WHERE category_id = ? AND id != ? LIMIT 4').all(product.category_id, product.id);
  res.json({ ...product, related });
});

module.exports = router;
