const express = require('express');
const router  = express.Router();
const Booking = require('../models/Booking');

// ── CREATE — POST /api/bookings ──
router.post('/', async (req, res) => {
  try {
    const { tutor_id, date, time } = req.body;

    const booking = await Booking.create({
      tutor_id,
      date,
      time,
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ── READ ALL — GET /api/bookings ──
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ── READ ONE — GET /api/bookings/:id ──
router.get('/:id', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ── UPDATE — PUT /api/bookings/:id ──
router.put('/:id', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    const { date, time, status } = req.body;
    if (date)   booking.date   = date;
    if (time)   booking.time   = time;
    if (status) booking.status = status;

    const updated = await booking.save();
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ── DELETE — DELETE /api/bookings/:id ──
router.delete('/:id', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    await booking.deleteOne();
    res.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
