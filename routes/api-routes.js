'use strict';
const express = require('express');
const Entry = require('../models/entry');
const User = require('../models/user');
const bodyParser = require('body-parser').json();
const jwt = require('../lib/auth-middleware');

const blogRouter = express.Router();

blogRouter.get('/', (req, res, next) => {
  Entry.find({}, (err, entry) => {
    if (err) return next(err);
    res.json(entry);
  });
});

blogRouter.post('/', bodyParser, jwt, (req, res, next) => {
  let newEntry = new Entry(req.body);
  User.findByIdAndUpdate(req.user._id,
    {$push: {'entries': newEntry}},
    {safe: true, upsert: true},
    function(err) {
      if (err) return next(err);
    }
  );
  newEntry.save((err, entry) => {
    if (err) return next(err);
    res.json(entry);
  });
});

blogRouter.put('/', bodyParser, jwt, (req, res, next) => {
  let _id = req.body._id;
  Entry.findOneAndUpdate({_id}, req.body, (err, entry) => {
    if (err) return next(err);
    res.json({message: 'successfully updated', data: entry});
  });
});

blogRouter.delete('/:id', jwt, (req, res, next) => {
  let _id = req.params.id;
  Entry.findOneAndRemove({_id}, null, (err, entry) => {
    if (err) return next(err);
    res.json({message: 'successfully deleted', data: entry});
  });
});

module.exports = blogRouter;
