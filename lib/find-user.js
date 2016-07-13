'use strict';

const User = require('../models/user');

module.exports = function(req, res, next) {
  console.log('user login find user', req.auth);
  let username = req.auth.username;

  User.findOne({username}, (err, user) => {
    if (err) return next(err);
    res.user = user;
  });
};
