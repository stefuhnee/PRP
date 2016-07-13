'use strict';
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const blogRouter = require('./routes/api-routes');
const authRouter = require('./routes/auth-routes');

const dbPort = process.env.MONGODB_URI || 'mongodb://localhost/dev_db';
mongoose.connect(dbPort);

const port = process.env.PORT || 8080;

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/build'));

app.get('/', function(req, res) {
  res.render('index');
});

app.use(morgan('dev'));

app.use(cors());

app.use('/blog', blogRouter);
app.use('/', authRouter);

app.use((err, req, res, next) =>{
  res.status(500).json({message: err.message});
  next(err);
});
app.use((req, res)=>{
  res.status(404).json({message: 'Not found'});
});

app.listen(port, () => {
  console.log('server is running on ' + port);
});
