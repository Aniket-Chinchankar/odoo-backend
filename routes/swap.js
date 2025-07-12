const express = require('express');
const router = express.Router();
const SwapRequest = require('../models/SwapRequest');
const auth = require('../middleware/auth');

// ✅ Create Swap Request
router.post('/', auth, async (req, res) => {
  const { toUser, offeredSkill, wantedSkill, message } = req.body;

  try {
    const newSwap = new SwapRequest({
      fromUser: req.user.id,
      toUser,
      offeredSkill,
      wantedSkill,
      message
    });

    await newSwap.save();
    res.status(201).json(newSwap);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// ✅ Get All Swap Requests (for current user)
router.get('/', auth, async (req, res) => {
  try {
    const swaps = await SwapRequest.find({
      $or: [{ fromUser: req.user.id }, { toUser: req.user.id }]
    }).populate('fromUser toUser', 'name email skillsOffered skillsWanted');

    res.json(swaps);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// ✅ Update Swap Request Status (Accept/Reject)
router.put('/:id', auth, async (req, res) => {
  const { status } = req.body;

  if (!['Accepted', 'Rejected'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }

  try {
    const updated = await SwapRequest.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
});

module.exports = router;
