const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  food: {
    type: String,
    required: true,
  },
  perishable: {
    type: String,
    enum: ['Yes', 'No'],
    required: true,
  },
  category: {
    type: String,
    enum: ['Bakery', 'Beverages', 'Dairy', 'Deli', 'Pantry', 'Produce', 'Protein', 'Snacks'],
    required: true,
  }
})

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  pantry: [foodSchema],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
