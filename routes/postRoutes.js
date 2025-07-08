const express = require('express');
const router = express.Router();
// Importing the post controller functions
// These functions handle the logic for creating posts
const { createPost } = require('../controllers/postController');

router.post('/', createPost);

module.exports = router;
