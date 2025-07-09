const express = require('express');
const router = express.Router();
const { createPost, getPosts, deletePost } = require('../controllers/postController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, createPost);
router.get('/', protect, getPosts);
router.delete('/:id', protect, deletePost); // dynamic route for deleting specific post

module.exports = router;
