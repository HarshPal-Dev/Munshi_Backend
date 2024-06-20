const mongoose = require('mongoose');

const breakfastSchema = new mongoose.Schema({
  rollNo: {
    type: Number,
    required: true,
    unique: true
  },
  mealType: {
    type: String,
    enum: ['breakfast', 'lunch', 'dinner', 'snack'],
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

const Breakfast = mongoose.model('Breakfast', breakfastSchema);

module.exports = Breakfast;
