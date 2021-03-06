'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const secret = process.env.SECRET || 'notredpanda';
const jwt = require('jsonwebtoken');

const User = new mongoose.Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  posts: {type: String, required: false},
  following: Array,
  favorites: Array
});

User.methods.hashPassword = function() {
  return bcrypt.hashSync(this.password, 8);
};

User.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

User.methods.generateToken = function() {
  console.log('token returned', jwt.sign({_id: this._id}, secret));
  return jwt.sign({_id: this._id}, secret);
};

module.exports = mongoose.model('user', User);
