// =======================
// BACKEND
// File: routes/user.js
// =======================

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth'); // ✅ Auth middleware

// Update profile
router.put('/update', auth, async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.user.id, req.body, { new: true });
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Public profiles
router.get('/public', async (req, res) => {
  try {
    const users = await User.find({ isPublic: true });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
