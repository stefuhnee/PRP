'use strict';

const express = require('express');
const bodyParser = require('body-parser').json();
const User = require('../models/user.js');
const basicHttp = require('../lib/basic-http.js');

const authRouter = module.exports = exports = express.Router();

authRouter.post('/signup', bodyParser, (req,res,next)=> {
  let newUser = new User(req.body);
  let hashedPassword = newUser.hashedPassword();

  newUser.password = hashedPassword;

  req.body.password = null;

  User.findOne({username:req.body.username}, (err,user)=> {
    if (user) return next(new Error('User already exists'));

    if (err) return next(new Error(err));

    newUser.save((err,user)=> {
      if (err) return next(new Error(err));

      let object = {};

      object.token = user.generateToken();
      object.userID = user._id;

      res.json(object);

    });
  });
});

authRouter.get('/login', basicHttp, (req,res,next)=> {
  User.findOne({username:req.auth.username}, (err,user)=> {

    if (err || !user) return next(new Error('Authentication error'));

    let object = {};

    object.token = user.generateToken();
    object.userID = user._id;

    res.json(object);
  });
});
