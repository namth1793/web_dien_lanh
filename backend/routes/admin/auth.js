const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { db } = require('../../db/database');

router.post('/login', (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: 'Thiếu thông tin' });

    let user;
    try {
      user = db.prepare('SELECT * FROM admin_users WHERE username = ?').get(username);
    } catch (e) {
      // Bảng admin_users chưa tồn tại (DB cũ trước khi thêm tính năng admin)
      console.error('admin_users table missing:', e.message);
      return res.status(500).json({ error: 'Chưa khởi tạo bảng admin. Hãy restart server.' });
    }

    if (!user) return res.status(401).json({ error: 'Sai tài khoản hoặc mật khẩu' });

    const valid = bcrypt.compareSync(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Sai tài khoản hoặc mật khẩu' });

    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET is not set');
      return res.status(500).json({ error: 'Server chưa cấu hình JWT_SECRET' });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    res.json({ token, username: user.username });
  } catch (e) {
    console.error('Login error:', e.message);
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
