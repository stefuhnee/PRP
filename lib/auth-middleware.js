'use strict';

const User = require('../models/user');
const jwt  = require('jsonwebtoken');
const secret = process.env.SECRET || 'notredpanda';

module.exports = function(req,res,next) {
  let token = req.headers.token || req.body.token;

  let err = new Error('authentication failure');
  err.statusCode = 500;

  if (!token) return next(new Error('no token'));

  try {
    token = jwt.verify(token, secret);
  } catch(e) {
    return next(new Error('Invalid token'));
  }

  User.findOne({_id: token}, (e, user) => {
    if(e || !user) next(new Error('database error'));
    req.user = user;
    next();
  });
};
