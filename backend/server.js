const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// ── Middleware ──
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

// ── Routes ──
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/auth',     require('./routes/auth'));

// ── Health check ──
app.get('/', (req, res) => {
  res.json({ message: 'QUTutSupport API is running!' });
});

// ── Connect to MongoDB & Start Server ──
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(process.env.PORT || 5000, () => {
      console.log(`✅ Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });
