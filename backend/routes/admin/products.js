const express = require('express');
const router = express.Router();
const { db } = require('../../db/database');
const auth = require('../../middleware/auth');
const { upload, cloudinary } = require('../../utils/cloudinary');

function makeSlug(str) {
  const map = { 'á':'a','à':'a','ả':'a','ã':'a','ạ':'a','ă':'a','ắ':'a','ằ':'a','ẳ':'a','ẵ':'a','ặ':'a','â':'a','ấ':'a','ầ':'a','ẩ':'a','ẫ':'a','ậ':'a','đ':'d','é':'e','è':'e','ẻ':'e','ẽ':'e','ẹ':'e','ê':'e','ế':'e','ề':'e','ể':'e','ễ':'e','ệ':'e','í':'i','ì':'i','ỉ':'i','ĩ':'i','ị':'i','ó':'o','ò':'o','ỏ':'o','õ':'o','ọ':'o','ô':'o','ố':'o','ồ':'o','ổ':'o','ỗ':'o','ộ':'o','ơ':'o','ớ':'o','ờ':'o','ở':'o','ỡ':'o','ợ':'o','ú':'u','ù':'u','ủ':'u','ũ':'u','ụ':'u','ư':'u','ứ':'u','ừ':'u','ử':'u','ữ':'u','ự':'u','ý':'y','ỳ':'y','ỷ':'y','ỹ':'y','ỵ':'y' };
  return str.toLowerCase().split('').map(c => map[c] || c).join('').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') + '-' + Date.now();
}

// GET all products with category info
router.get('/', auth, (req, res) => {
  const { category_id } = req.query;
  let query = 'SELECT p.*, c.name as category_name FROM products p LEFT JOIN categories c ON p.category_id = c.id WHERE 1=1';
  const params = [];
  if (category_id) { query += ' AND p.category_id = ?'; params.push(parseInt(category_id)); }
  query += ' ORDER BY p.category_id ASC, p.id DESC';
  res.json(db.prepare(query).all(...params));
});

// GET single product
router.get('/:id', auth, (req, res) => {
  const p = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
  if (!p) return res.status(404).json({ error: 'Không tìm thấy' });
  res.json(p);
});

// POST create product
router.post('/', auth, upload.single('image'), (req, res) => {
  try {
    const { name, category_id, brand, model, price, original_price, description, specs, is_featured, is_sale, stock } = req.body;
    if (!name || !category_id || !price) return res.status(400).json({ error: 'Thiếu thông tin bắt buộc' });
    const slug = makeSlug(name);
    const image = req.file ? req.file.path : '';
    db.prepare(`INSERT INTO products (name,slug,category_id,brand,model,price,original_price,description,specs,image,is_featured,is_sale,stock)
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`).run(
      name, slug, parseInt(category_id), brand || '', model || '',
      parseInt(price), original_price ? parseInt(original_price) : null,
      description || '', specs || '{}', image,
      is_featured === 'true' || is_featured === '1' ? 1 : 0,
      is_sale === 'true' || is_sale === '1' ? 1 : 0,
      stock ? parseInt(stock) : 10
    );
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// PUT update product
router.put('/:id', auth, upload.single('image'), (req, res) => {
  try {
    const { name, category_id, brand, model, price, original_price, description, specs, is_featured, is_sale, stock } = req.body;
    const existing = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
    if (!existing) return res.status(404).json({ error: 'Không tìm thấy' });

    let image = existing.image;
    if (req.file) {
      if (existing.image && existing.image.includes('cloudinary')) {
        const parts = existing.image.split('/');
        const publicId = 'dien-lanh-mk/' + parts[parts.length - 1].split('.')[0];
        cloudinary.uploader.destroy(publicId).catch(() => {});
      }
      image = req.file.path;
    }

    db.prepare(`UPDATE products SET name=?,category_id=?,brand=?,model=?,price=?,original_price=?,description=?,specs=?,image=?,is_featured=?,is_sale=?,stock=? WHERE id=?`).run(
      name, parseInt(category_id), brand || '', model || '',
      parseInt(price), original_price ? parseInt(original_price) : null,
      description || '', specs || '{}', image,
      is_featured === 'true' || is_featured === '1' ? 1 : 0,
      is_sale === 'true' || is_sale === '1' ? 1 : 0,
      stock ? parseInt(stock) : 10,
      req.params.id
    );
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// DELETE product
router.delete('/:id', auth, (req, res) => {
  try {
    const existing = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
    if (!existing) return res.status(404).json({ error: 'Không tìm thấy' });
    if (existing.image && existing.image.includes('cloudinary')) {
      const parts = existing.image.split('/');
      const publicId = 'dien-lanh-mk/' + parts[parts.length - 1].split('.')[0];
      cloudinary.uploader.destroy(publicId).catch(() => {});
    }
    db.prepare('DELETE FROM products WHERE id = ?').run(req.params.id);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
