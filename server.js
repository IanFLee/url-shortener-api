'use strict';


const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');
var ObjectID = mongodb.ObjectID;

var app = express();

var paramURL;
var uri = process.env.URL;
var toPrint = '';

app.get('/new/:url', function(req, res) {
  paramURL = req.params.url;
  toPrint += '<h1>ok, ready?</h1>';
  toPrint += 'connecting to '+paramURL+'<br/>';
  res.send(toPrint);
});

app.use(express.static("public"));


// create a database connection variable outside of the database connection callback
// to reuse the connection pool in the app
// var db;

function getShortRandom() {
  var full = "";
  for (let i = 0; i < 4; i++) {
    full += Math.floor(Math.random() * Math.floor(10));
  }
}

var shortURLObj = {
  input : paramURL,
  short : getShortRandom()
};

// MATH.RANDOM TO GET SHORTENED URL
// {INPUT : paramUrl, SHORT : RANDOM 4 DIGIT}
// INSERT IT

// connect to the db before starting the app server
mongodb.MongoClient.connect(uri, function(err, database) {
  if (err) {console.log(err); process.exit(1);}
  
  var urls = database.collection('urls');
console.log(shortURLObj);
  urls.insert(shortURLObj, function(err, results) {
    if (err) throw err;
    database.close(function (err) {
      if (err) throw err;
    });
  });

  // save db obj from callback for reuse
 //  db = database;
  console.log('database connection ready ');
});


app.listen("3000", function () {
  console.log('Node.js listening ...');
});
