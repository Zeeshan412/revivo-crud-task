const mongoose = require('mongoose');

// Schema for the Post entity: each post is linked to a user (createdBy) and has content
const postSchema = new mongoose.Schema({
  createdBy: {
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
