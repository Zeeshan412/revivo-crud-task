const Post = require('../models/Post');

// @desc    Create a new post
// @route   POST /api/posts
// @access  Private
exports.createPost = async (req, res) => {
    try {
      const post = await Post.create({
        content: req.body.content,
        createdBy: req.user._id, // must match the schema field
      });
  
      res.status(201).json(post);
    } catch (err) {
      console.error("Post creation failed:", err.message);
      res.status(500).json({ message: "Failed to create post." });
    }
  };
  

// @desc    Get all posts with creator info
// @route   GET /api/posts
// @access  Private
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('createdBy', 'name email');
    res.status(200).json(posts);
  } catch (err) {
    console.error("Fetching posts failed:", err.message);
    res.status(500).json({ message: "Failed to fetch posts." });
  }
};
//delete post
exports.deletePost = async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post) return res.status(404).json({ message: 'Post not found' });
  
      if (post.createdBy.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Unauthorized to delete this post' });
      }
  
      await post.deleteOne();
      res.json({ message: 'Post deleted' });
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  };
  
