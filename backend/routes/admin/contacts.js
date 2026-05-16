const express = require('express');
const router = express.Router();
const { db } = require('../../db/database');
const auth = require('../../middleware/auth');

router.get('/', auth, (req, res) => {
  res.json(db.prepare('SELECT * FROM contacts ORDER BY id DESC').all());
});

router.delete('/:id', auth, (req, res) => {
  db.prepare('DELETE FROM contacts WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

module.exports = router;
