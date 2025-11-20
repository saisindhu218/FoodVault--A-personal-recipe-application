const express = require('express');
const {
  getRecipes,
  getRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  getUserRecipes
} = require('../controllers/recipeController');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', getRecipes);
router.get('/my-recipes', auth, getUserRecipes);
router.get('/:id', getRecipe);
router.post('/', auth, createRecipe);
router.put('/:id', auth, updateRecipe);
router.delete('/:id', auth, deleteRecipe);

module.exports = router;