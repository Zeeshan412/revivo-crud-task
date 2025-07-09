const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// Auth routes
router.post('/register', register);
router.post('/login', login);

// Get current logged-in user
router.get('/me', protect, async (req, res) => {
  res.json(req.user);
});

module.exports = router;
