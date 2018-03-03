'use strict';


const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');
var ObjectID = mongodb.ObjectID;

var app = express();

var paramURL, db;
var uri = process.env.URL;
var toPrint = '';

app.get('/', function(req, res) {
  res.send('welcome home');
});

app.get('/new/:incorrect', function(req, res) {
  res.send('incorrect url format. prefix with https://');
});

app.get('/new/https://:url', function(req, res) {
  paramURL = req.params.url;
  toPrint += '<h1>ok, ready?</h1>';
  toPrint += 'connecting to '+paramURL+'<br/>';
  var urls = db.collection('urls');
  console.log(req.params.url);
  function getShortRandom() {
    var full = "";
    for (let i = 0; i < 4; i++) {
      full += Math.floor(Math.random() * Math.floor(10));
    }
    return full;
  }
  var shortURLObj = {
    input : paramURL,
    short : getShortRandom()
  };
  toPrint += '<h3>input: '+shortURLObj.input+'<br/>'+'short: <a href="asparism-url-shortener-microservice.glitch.me/'+shortURLObj.short+'">asparism-url-shortener-microservice.glitch.me/'+shortURLObj.short+'</a></h3>';
  
  urls.insert(shortURLObj, function(err, results) {
    if (err) throw err;
    // DROP ALL TEST DATA WHEN YOU'RE FINISHED 
    // urls.drop something somethign
    db.close(function (err) {
      if (err) throw err;
    });
  });
  
  res.send(toPrint);
});

app.get('/:short', function(req, res, next) {
  var urls = db.collection('urls');
  urls.find({ short : req.params.short }, { id : 0, input : 1 }).toArray(function (err, result) {
    var originalURL = result[0].input;
    res.redirect('https://'+originalURL);
    ret
  });
});

app.use(express.static("public"));


// create a database connection variable outside of the database connection callback
// to reuse the connection pool in the app
// var db;


// MATH.RANDOM TO GET SHORTENED URL
// {INPUT : paramUrl, SHORT : RANDOM 4 DIGIT}
// INSERT IT

// connect to the db before starting the app server
mongodb.MongoClient.connect(uri, function(err, database) {
  if (err) {console.log(err); process.exit(1);}

  // save db obj from callback for reuse
 db = database;
  console.log('database connection ready ');
});

app.listen("3000", function () {
    console.log('Node.js listening ...');
  });

