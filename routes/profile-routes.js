'use strict';

const express = require('express');
const User = require('../models/user');
const bodyParser = require('body-parser').json();

const profileRouter = express.Router();

profileRouter.get('/:username', bodyParser, (req,res,next) => {
  let username = req.param.username;

  User.findOne({username}, (err, user) => {
    if(err) return next(err);
    res.json(user);
  });
});
