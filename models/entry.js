'use strict';
const mongoose = require('mongoose');


const Entry = new mongoose.Schema({
  title: {type: String, required: true},
  content: {type: String, required: true},
  image: String,
  cost: String,
  timeline: String,
  author: String,
  comments: Array //Stretch for comments on blog posts
});

module.exports = mongoose.model('blogEntry', Entry);
