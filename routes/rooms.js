const express = require('express');
const router = express.Router();
const Room = require('../models/Room');

// ── GET all rooms (with optional filters) ──────────────────────────────────
router.get('/', async (req, res) => {
  try {
    const { type, minRent, maxRent, availableFor, area, available } = req.query;
    let filter = {};

    if (type) filter.type = type;
    if (availableFor && availableFor !== 'Any') {
      filter.availableFor = { $in: [availableFor, 'Any'] };
    }
    if (area) filter['location.area'] = { $regex: area, $options: 'i' };
    if (available !== undefined) filter.isAvailable = available === 'true';
    if (minRent || maxRent) {
      filter.rent = {};
      if (minRent) filter.rent.$gte = Number(minRent);
      if (maxRent) filter.rent.$lte = Number(maxRent);
    }

    const rooms = await Room.find(filter).sort({ postedAt: -1 });
    res.json({ success: true, count: rooms.length, data: rooms });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ── GET single room by ID ──────────────────────────────────────────────────
router.get('/:id', async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ success: false, message: 'Room not found' });
    res.json({ success: true, data: room });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ── POST create new room ───────────────────────────────────────────────────
router.post('/', async (req, res) => {
  try {
    const room = new Room(req.body);
    const savedRoom = await room.save();
    res.status(201).json({ success: true, message: 'Room listed successfully!', data: savedRoom });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    res.status(500).json({ success: false, message: err.message });
  }
});

// ── PUT update room by ID ──────────────────────────────────────────────────
router.put('/:id', async (req, res) => {
  try {
    const room = await Room.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!room) return res.status(404).json({ success: false, message: 'Room not found' });
    res.json({ success: true, message: 'Room updated successfully!', data: room });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    res.status(500).json({ success: false, message: err.message });
  }
});

// ── DELETE room by ID ──────────────────────────────────────────────────────
router.delete('/:id', async (req, res) => {
  try {
    const room = await Room.findByIdAndDelete(req.params.id);
    if (!room) return res.status(404).json({ success: false, message: 'Room not found' });
    res.json({ success: true, message: 'Room listing removed successfully!' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ── PATCH toggle availability ──────────────────────────────────────────────
router.patch('/:id/toggle', async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ success: false, message: 'Room not found' });
    room.isAvailable = !room.isAvailable;
    await room.save();
    res.json({ success: true, message: `Room marked as ${room.isAvailable ? 'Available' : 'Unavailable'}`, data: room });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
