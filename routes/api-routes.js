'use strict';
const express = require('express');
const Entry = require('./models/entry');
const User = require('./models/user');
const bodyParser = require('body-parser');
const jwt = require('./lib/auth-middleware');

const blogRouter = module.exports = exports = express.Router();

blogRouter.get('/blog', (req, res, next) => {
  Entry.find({}, (err, entry) => {
    if(err) return next(err);
    res.json(entry);
  });
});

blogRouter.post('/blog', bodyParser, jwt, (req, res, next) => {
  let newEntry = new Entry(req.body);
  User.findByIdAndUpdate(req.user._id,
    {$push: {'entries': newEntry}},
    {safe: true, upsert: true},
    function(err, model) {
      console.log(err, model);
    }
  );
  newEntry.save((err, entry) => {
    if (err) return next(err);
    res.json(entry);
  });
});

blogRouter.put('/blog', bodyParser, jwt, (req, res, next) => {
  let _id = req.body._id;
  Entry.findOneAndUpdate({_id}, req.body, (err, entry) => {
    if (err) return next(err);
    res.json({message: 'successfully updated', data: entry});
  });
});

blogRouter.delete('/blog/:id', jwt, (req, res, next) => {
  let _id = req.params.id;
  Entry.findOneAndRemove({_id}, null, (err, entry) => {
    if (err) return next(err);
    res.json({message: 'successfully deleted', data: entry});
  });
});
