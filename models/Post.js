const mongoose = require('mongoose');

// Schema for the Post entity which has a user reference and content
// user is a reference to the User model and is required
const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);
