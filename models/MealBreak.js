const mongoose = require('mongoose');

const mealBreakSchema = new mongoose.Schema({
  rollNo: {
    type: Number,
    required: true,
    unique: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  }
});

const MealBreak = mongoose.model('MealBreak', mealBreakSchema);

module.exports = MealBreak;
