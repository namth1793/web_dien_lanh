const express = require('express');
const router = express.Router();
const { db } = require('../../db/database');
const auth = require('../../middleware/auth');
const { upload, cloudinary } = require('../../utils/cloudinary');

function makeSlug(str) {
  const map = { 'á':'a','à':'a','ả':'a','ã':'a','ạ':'a','ă':'a','ắ':'a','ằ':'a','ẳ':'a','ẵ':'a','ặ':'a','â':'a','ấ':'a','ầ':'a','ẩ':'a','ẫ':'a','ậ':'a','đ':'d','é':'e','è':'e','ẻ':'e','ẽ':'e','ẹ':'e','ê':'e','ế':'e','ề':'e','ể':'e','ễ':'e','ệ':'e','í':'i','ì':'i','ỉ':'i','ĩ':'i','ị':'i','ó':'o','ò':'o','ỏ':'o','õ':'o','ọ':'o','ô':'o','ố':'o','ồ':'o','ổ':'o','ỗ':'o','ộ':'o','ơ':'o','ớ':'o','ờ':'o','ở':'o','ỡ':'o','ợ':'o','ú':'u','ù':'u','ủ':'u','ũ':'u','ụ':'u','ư':'u','ứ':'u','ừ':'u','ử':'u','ữ':'u','ự':'u','ý':'y','ỳ':'y','ỷ':'y','ỹ':'y','ỵ':'y' };
  return str.toLowerCase().split('').map(c => map[c] || c).join('').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') + '-' + Date.now();
}

function destroyCloudinary(url) {
  if (!url || !url.includes('cloudinary')) return;
  const parts = url.split('/');
  const publicId = 'dien-lanh-mk/' + parts[parts.length - 1].split('.')[0];
  cloudinary.uploader.destroy(publicId).catch(() => {});
}

function parseImages(jsonStr, fallbackImage) {
  try {
    const arr = JSON.parse(jsonStr || '[]');
    if (Array.isArray(arr) && arr.length) return arr;
  } catch {}
  return fallbackImage ? [fallbackImage] : [];
}

// GET all products
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

// POST create product – accept up to 20 images
router.post('/', auth, upload.array('images', 20), (req, res) => {
  try {
    const { name, category_id, brand, model, price, original_price, description, specs, is_featured, is_sale, stock } = req.body;
    if (!name || !category_id || !price) return res.status(400).json({ error: 'Thiếu thông tin bắt buộc' });
    const slug = makeSlug(name);
    const imageUrls = req.files ? req.files.map(f => f.path) : [];
    const image = imageUrls[0] || '';
    const images = JSON.stringify(imageUrls);
    db.prepare(`INSERT INTO products (name,slug,category_id,brand,model,price,original_price,description,specs,image,images,is_featured,is_sale,stock)
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`).run(
      name, slug, parseInt(category_id), brand || '', model || '',
      parseInt(price), original_price ? parseInt(original_price) : null,
      description || '', specs || '{}', image, images,
      is_featured === 'true' || is_featured === '1' ? 1 : 0,
      is_sale === 'true' || is_sale === '1' ? 1 : 0,
      stock ? parseInt(stock) : 10
    );
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// PUT update product – keepImages (JSON) + new images files
router.put('/:id', auth, upload.array('images', 20), (req, res) => {
  try {
    const { name, category_id, brand, model, price, original_price, description, specs, is_featured, is_sale, stock, keepImages } = req.body;
    const existing = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
    if (!existing) return res.status(404).json({ error: 'Không tìm thấy' });

    // Parse kept URLs (existing images user chose to keep)
    let keptUrls = [];
    try { keptUrls = JSON.parse(keepImages || '[]'); } catch {}

    // Newly uploaded images
    const newUrls = req.files ? req.files.map(f => f.path) : [];

    // Combined image list
    const allImages = [...keptUrls, ...newUrls];
    const image = allImages[0] || existing.image;
    const imagesJson = JSON.stringify(allImages);

    // Delete removed images from Cloudinary
    const existingImgs = parseImages(existing.images, existing.image);
    existingImgs.filter(url => !keptUrls.includes(url)).forEach(destroyCloudinary);

    db.prepare(`UPDATE products SET name=?,category_id=?,brand=?,model=?,price=?,original_price=?,description=?,specs=?,image=?,images=?,is_featured=?,is_sale=?,stock=? WHERE id=?`).run(
      name, parseInt(category_id), brand || '', model || '',
      parseInt(price), original_price ? parseInt(original_price) : null,
      description || '', specs || '{}', image, imagesJson,
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
    parseImages(existing.images, existing.image).forEach(destroyCloudinary);
    db.prepare('DELETE FROM products WHERE id = ?').run(req.params.id);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
