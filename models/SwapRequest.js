const mongoose = require('mongoose');

const SwapRequestSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  skillOffered: String,
  skillWanted: String,
  status: { type: String, default: 'pending' }, // pending, accepted, rejected
  message: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SwapRequest', SwapRequestSchema);
