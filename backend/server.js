require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { initDB } = require('./db/database');

const app = express();
const PORT = process.env.PORT || 5025;

const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',')
  : true;

app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json());

initDB();

// Public routes
app.use('/api/categories', require('./routes/categories'));
app.use('/api/products', require('./routes/products'));
app.use('/api/news', require('./routes/news'));
app.use('/api/contacts', require('./routes/contacts'));
app.use('/api/orders', require('./routes/orders'));

// Admin routes
app.use('/api/admin/auth', require('./routes/admin/auth'));
app.use('/api/admin/products', require('./routes/admin/products'));
app.use('/api/admin/categories', require('./routes/admin/categories'));
app.use('/api/admin/news', require('./routes/admin/news'));
app.use('/api/admin/orders', require('./routes/admin/orders'));
app.use('/api/admin/contacts', require('./routes/admin/contacts'));

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend running on port ${PORT}`);
});
