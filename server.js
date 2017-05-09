'use strict';

var express = require('express');
var cors = require('cors');
var dotenv = require('dotenv').load();

var multer = require('multer');
var upload = multer();

var app = express();

app.use(cors());
app.use(express.static('public'));

app.get('/', function (req, res) {
     res.sendFile(__dirname + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

app.post('/api/fileanalyse', upload.single('upfile'), function(req, res, next) {

  if(!req.file) return next(new Error('No file chosen to upload'));

  var fileInfo = {
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  }
  res.json(fileInfo);
});

/////////////////// Taken from exercise tracker microservice api project

// Not found middleware
app.use((req, res, next) => next({status: 404, message: 'not found'}) );

// Error Handling middleware
app.use((err, req, res, next) => {
  let errCode, errMessage

  if (err.errors) {
    // mongoose validation error
    errCode = 400 // bad request
    const keys = Object.keys(err.errors)
    // report the first validation error
    errMessage = err.errors[keys[0]].message
  } else {
    // generic or custom error
    errCode = err.status || 500
    errMessage = err.message || 'Internal Server Error'
  }
  res.status(errCode).type('txt')
    .send(errMessage)
})


const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
