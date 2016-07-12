'use strict';

const express = require('express');
const bodyParser = require('body-parser').json();
const User = require('../models/user.js');
const basicHttp = require('../lib/basic-http.js');

const authRouter = express.Router();

authRouter.post('/signup', bodyParser, (req, res, next) => {
  let newUser = new User(req.body);
  newUser.password = newUser.hashPassword();
  req.body.password = null;

  User.findOne({username: req.body.username}, (err, user) => {
    if (err || user) return next(new Error('Cannot create user'));

    newUser.save((err, user) => {
      if (err) return next(new Error(err));

      return res.json({token: user.generateToken()});
    });
  });
});

authRouter.get('/login', basicHttp, (req, res, next) => {
  User.findOne({username: req.auth.username}, (err, user) => {

    if (err || !user) return next(new Error('Authentication error'));

    if (!user.comparePassword(req.auth.password)) {
      return next(new Error('Invalid password'));
    }
    return res.json({token: user.generateToken()});
  });
});

module.exports = authRouter;
