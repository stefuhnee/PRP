'use strict';

const BlogEntry = new mongoose.Schema({
  title: {type: String, required: true},
  content: {type: String, required: true},
  image: String,
  cost: Number,
  timeline: String,
  author: String,
  comments: Array //Stretch for comments on blog posts
});

module.exports = mongoose.model('blogEntry', BlogEntry);
