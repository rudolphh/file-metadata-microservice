'use strict';

var express = require('express');
var cors = require('cors');
var dotenv = require('dotenv').load();

var multer = require('multer');
var upload = multer();

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
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



app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ... on port ' + process.env.PORT);
});
