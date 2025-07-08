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
});

module.exports = mongoose.model('User', userSchema);
