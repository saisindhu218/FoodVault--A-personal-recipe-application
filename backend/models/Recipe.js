const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Recipe title is required'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  ingredients: [{
    type: String,
    required: true
  }],
  preparationSteps: {
    type: String,
    required: [true, 'Preparation steps are required']
  },
  prepTime: {
    type: Number
  },
  cookTime: {
    type: Number
  },
  servings: {
    type: Number
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    default: 'Medium'
  },
  category: {
    type: String,
    required: [true, 'Category is required']
  },
  imageUrl: {
    type: String
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Recipe', recipeSchema);