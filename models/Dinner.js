const mongoose = require('mongoose');

const dinnerSchema = new mongoose.Schema({
  rollNo: {
    type: Number,
    required: true,
    unique: true
  },
  mealType: {
    type: String,
    enum: ['dinner'],
    default: 'dinner',
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

const Dinner = mongoose.model('Dinner', dinnerSchema);

module.exports = Dinner;
