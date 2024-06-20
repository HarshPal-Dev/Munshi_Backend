const mongoose = require('mongoose');

const snacksSchema = new mongoose.Schema({
  rollNo: {
    type: Number,
    required: true,
    unique: true
  },
  mealType: {
    type: String,
    enum: ['snacks'],
    default: 'snacks',
    required: true
  },
  extraItems: {
    type: [String],
    default: []
  },
  totalCost: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Snacks = mongoose.model('Snacks', snacksSchema);

module.exports = Snacks;
