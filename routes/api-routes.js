'use strict';
const express = require('express');
const Entry = require('./models/entry');
const bodyParser = require('body-parser');
const jwt = require('./lib/auth-middleware');

const blogRouter = module.exports = exports = express.Router();

blogRouter.get('/', (req, res, next) => {
  Entry.find({}, (err, entry) => {
    if(err) return next(err);
    res.json(entry);
  });
});

blogRouter.post('/', bodyParser, jwt, (req, res, next) => {
  let newEntry = new Entry(req.body);
  newEntry.save((err, entry) => {
    if (err) return next(err);
    res.json(entry);
  });
});

blogRouter.put('/', bodyParser, jwt, (req, res, next) => {
  let _id = req.body._id;
  Entry.findOneAndupdate({_id}, req.body, (err, entry) => {
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
