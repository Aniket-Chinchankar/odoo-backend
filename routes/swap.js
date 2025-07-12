const express = require('express');
const router = express.Router();
const SwapRequest = require('../models/SwapRequest');
const auth = require('../middleware/auth');

// Create swap request
router.post('/create', auth, async (req, res) => {
  try {
    const swap = new SwapRequest({ ...req.body, sender: req.user.id });
    await swap.save();
    res.status(201).json(swap);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get user swap requests
router.get('/my-requests', auth, async (req, res) => {
  try {
    const sent = await SwapRequest.find({ sender: req.user.id }).populate('receiver');
    const received = await SwapRequest.find({ receiver: req.user.id }).populate('sender');
    res.json({ sent, received });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update server/routes/swap.js
router.put('/update/:id', auth, async (req, res) => {
  try {
    const updated = await SwapRequest.findByIdAndUpdate(req.params.id, {
      status: req.body.status
    }, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
