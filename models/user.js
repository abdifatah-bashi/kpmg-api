const mongoose = require('mongoose');

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
  age: {
    type: Number,
    required: true,
  },
  image: {
    type: String, // Field to store image path
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
