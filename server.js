const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { testConnection } = require('./config/database');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from frontend
app.use(express.static('frontend'));

// Test database connection
testConnection().catch(err => {
  process.exit(1);
});

// Routes
app.use('/api/posts', require('./routes/posts'));
app.use('/api/comments', require('./routes/comments'));

// Serve frontend
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/frontend/index.html');
});

// Handle favicon requests
app.get('/favicon.ico', (req, res) => {
  res.status(204).end();
});

// 404 handler - must be before error handler
app.use((req, res, next) => {
  // Ignore common browser extension paths
  if (req.path.includes('chrome-extension') || req.path.includes('moz-extension')) {
    return res.status(204).end();
  }
  res.status(404).json({ error: 'Route not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
