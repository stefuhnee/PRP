'use strict';

const express = require('express');
const User = require('../models/user');
const bodyParser = require('body-parser').json();

const profileRouter = express.Router();

profileRouter.get('/', bodyParser, (req,res,next) => {
  let username = req.headers.profile;

  User.findOne({username:username}, (err, profile) => {
    if(err) return next(err);
    res.json(profile);
  });
});

module.exports = profileRouter;
