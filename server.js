require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.use('/api/rooms', require('./routes/rooms'));

// Serve HTML pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.get('/list', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pages', 'list.html'));
});
app.get('/post', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pages', 'post.html'));
});
app.get('/manage', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pages', 'manage.html'));
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`🚀 PG Finder server running at http://localhost:${PORT}`);
});
