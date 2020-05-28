const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

/**
 * A model is a class with which we construct documents. In this case, each document will be a user with properties and behaviors as declared in our schema.
 * @param {string} modelName
 * @param {Schema} mongoose.Schema
 * @returns {class}
 */
module.exports = User = mogoose.model('user', UserSchema);
