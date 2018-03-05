'use strict';

const express = require('express');
const mongodb = require('mongodb');

var app = express();

var paramURL, db;
var uri = process.env.URL;

app.get('/', function(req, res) {
  res.send('<h2>welcome home</h2><br/>Get a shortened url by pointing your browser in this format:<br/>asparism-url-shortener-microservice.glitch.me<h4>/new/https');
});

app.get('/new/:incorrect', function(req, res) {
  res.send({error: 'Incorrect input. Make sure to follow format: https://website.com'});
});

app.get('/new/https://:url', function(req, res) {
  paramURL = req.params.url;

  var urls = db.collection('urls');
  console.log('user entered '+paramURL);
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

  urls.insert(shortURLObj, function(err, results) {
    if (err) throw err;
    // DROP ALL TEST DATA WHEN YOU'RE FINISHED 
    // urls.drop something somethign
    console.log('inserted '+shortURLObj.short);
  });
  
  res.send(shortURLObj);
});

app.get('/:short', function(req, res, next) {
  var urls = db.collection('urls');
  console.log('searched for '+req.params.short);
  urls.find({ short : req.params.short }, { input : 1 }).toArray(function (err, result) {
    if (err) throw err;
    console.log('found '+result[0].input);
    var originalURL = result[0].input;
    console.log('getting ready to redirect to :'+originalURL);
    //res.redirect(301, 'https://'+originalURL);
    res.redirect('https://'+originalURL);
    db.close(function (err) {
      if (err) throw err;
      console.log('db closed');
    });
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

