const mongoose = require('mongoose');

const lunchSchema = new mongoose.Schema({
  rollNo: {
    type: Number,
    required: true,
    unique: true
  },
  mealType: {
    type: String,
    enum: ['lunch'],
    default: 'lunch',
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

const Lunch = mongoose.model('Lunch', lunchSchema);

module.exports = Lunch;
