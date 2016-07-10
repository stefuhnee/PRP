'use strict';
const express = require('express');
const app = express();
const mongoose = require('mongoose');

const dbPort = process.env.MONGODB_URI || 'mongodb://localhost/dev_db';
mongoose.connect(dbPort);

app.use(express.static(__dirname + '/build'));

app.use((err, req, res, next) =>{
  res.status(500).json({message: err.message});
  next(err);
});
app.use((req, res)=>{
  res.status(404).json({message: 'not found'});
});

app.listen(8080, () => {
  console.log('server is running on 8080');
});
