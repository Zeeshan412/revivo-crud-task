const Post = require('../models/Post');

// Create Post
exports.createPost = async (req, res) => {
  try {
    const { userId, content } = req.body;
    const post = await Post.create({ user: userId, content });
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
