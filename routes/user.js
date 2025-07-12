const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Public profiles
router.get('/public', async (req, res) => {
  try {
    const users = await User.find({ isPublic: true });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Profile update
router.put('/update', auth, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user.id, req.body, { new: true });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});


module.exports = router;
