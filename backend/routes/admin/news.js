const express = require('express');
const router = express.Router();
const { db } = require('../../db/database');
const auth = require('../../middleware/auth');
const { upload, cloudinary } = require('../../utils/cloudinary');

function makeSlug(str) {
  const map = { 'á':'a','à':'a','ả':'a','ã':'a','ạ':'a','ă':'a','ắ':'a','ằ':'a','ẳ':'a','ẵ':'a','ặ':'a','â':'a','ấ':'a','ầ':'a','ẩ':'a','ẫ':'a','ậ':'a','đ':'d','é':'e','è':'e','ẻ':'e','ẽ':'e','ẹ':'e','ê':'e','ế':'e','ề':'e','ể':'e','ễ':'e','ệ':'e','í':'i','ì':'i','ỉ':'i','ĩ':'i','ị':'i','ó':'o','ò':'o','ỏ':'o','õ':'o','ọ':'o','ô':'o','ố':'o','ồ':'o','ổ':'o','ỗ':'o','ộ':'o','ơ':'o','ớ':'o','ờ':'o','ở':'o','ỡ':'o','ợ':'o','ú':'u','ù':'u','ủ':'u','ũ':'u','ụ':'u','ư':'u','ứ':'u','ừ':'u','ử':'u','ữ':'u','ự':'u','ý':'y','ỳ':'y','ỷ':'y','ỹ':'y','ỵ':'y' };
  return str.toLowerCase().split('').map(c => map[c] || c).join('').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') + '-' + Date.now();
}

router.get('/', auth, (req, res) => {
  res.json(db.prepare('SELECT * FROM news ORDER BY id DESC').all());
});

router.get('/:id', auth, (req, res) => {
  const n = db.prepare('SELECT * FROM news WHERE id = ?').get(req.params.id);
  if (!n) return res.status(404).json({ error: 'Không tìm thấy' });
  res.json(n);
});

router.post('/', auth, upload.single('image'), (req, res) => {
  try {
    const { title, summary, content, category } = req.body;
    if (!title) return res.status(400).json({ error: 'Thiếu tiêu đề' });
    const slug = makeSlug(title);
    const image = req.file ? req.file.path : '';
    db.prepare('INSERT INTO news (title,slug,summary,content,image,category) VALUES (?,?,?,?,?,?)').run(
      title, slug, summary || '', content || '', image, category || 'tin-tuc'
    );
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.put('/:id', auth, upload.single('image'), (req, res) => {
  try {
    const { title, summary, content, category } = req.body;
    const existing = db.prepare('SELECT * FROM news WHERE id = ?').get(req.params.id);
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
    db.prepare('UPDATE news SET title=?,summary=?,content=?,image=?,category=? WHERE id=?').run(
      title, summary || '', content || '', image, category || 'tin-tuc', req.params.id
    );
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.delete('/:id', auth, (req, res) => {
  try {
    const existing = db.prepare('SELECT * FROM news WHERE id = ?').get(req.params.id);
    if (!existing) return res.status(404).json({ error: 'Không tìm thấy' });
    if (existing.image && existing.image.includes('cloudinary')) {
      const parts = existing.image.split('/');
      const publicId = 'dien-lanh-mk/' + parts[parts.length - 1].split('.')[0];
      cloudinary.uploader.destroy(publicId).catch(() => {});
    }
    db.prepare('DELETE FROM news WHERE id = ?').run(req.params.id);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
