'use strict';

const express = require('express');
const User = require('../models/user');
const bodyParser = require('body-parser').json();
const jwt = require('../lib/auth-middleware');
const findUser = require('../lib/find-user');

const adminRouter = express.Router();

adminRouter.get('/', bodyParser, (req,res,next) => {
  console.log($window.localStorage.username, 'local storage username');
  User.findOne({username:$window.localStorage.username}, (err, user) => {
    if(err) return next(err);
    res.json(user)
  });
});

adminRouter.put('/', bodyParser, jwt, (req, res, next) => {
  let _id = req.body._id;

  User.findOneAndUpdate({_id}, req.body, (err, user) => {
    if (err) return next(err);
    res.json({message: 'successfully updated', data: user});
  });
});

module.exports = adminRouter;
