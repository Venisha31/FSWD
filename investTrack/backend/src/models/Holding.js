// backend/src/models/Holding.js
const mongoose = require('mongoose');

const HoldingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  symbol: { type: String, required: true },
  quantity: { type: Number, required: true },
  avgPrice: { type: Number, required: true }, // average buy price
  currentPrice: { type: Number, default: 0 }, // current market price
  totalValue: { type: Number, default: 0 }, // quantity * currentPrice
  totalCost: { type: Number, required: true }, // quantity * avgPrice
  pnl: { type: Number, default: 0 }, // profit/loss
  pnlPercentage: { type: Number, default: 0 }, // P&L percentage
  lastUpdated: { type: Date, default: Date.now },
}, {
  timestamps: true
});

// Compound index to ensure unique user-symbol combinations
HoldingSchema.index({ user: 1, symbol: 1 }, { unique: true });

// Method to update current price and recalculate P&L
HoldingSchema.methods.updatePrice = function(currentPrice) {
  this.currentPrice = currentPrice;
  this.totalValue = this.quantity * currentPrice;
  this.pnl = this.totalValue - this.totalCost;
  this.pnlPercentage = this.totalCost > 0 ? (this.pnl / this.totalCost) * 100 : 0;
  this.lastUpdated = new Date();
  return this;
};

module.exports = mongoose.model('Holding', HoldingSchema);
