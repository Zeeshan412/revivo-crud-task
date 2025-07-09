const mongoose = require('mongoose');

// schema for the user entity which has a name and email
// name is a string and is required
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {   // password is a string and is required
    type: String,
    required: true,
  },
}, { timestamps: true }); // timestamps will automatically add createdAt and updatedAt fields

module.exports = mongoose.model('User', userSchema);
