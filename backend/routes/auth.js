const express = require('express');
const { register, login, getMe, forgotPassword, changePassword } = require('../controllers/authController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/change-password', auth, changePassword);
router.get('/me', auth, getMe);

module.exports = router;