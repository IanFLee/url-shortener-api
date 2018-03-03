'use strict';


const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');
var ObjectID = mongodb.ObjectID;

var app = express();

var paramURL;

app.get('/:url', function(req, res) {
  paramURL = req.params.url;
});

app.use(express.static("public"));

var uri = process.env.URL;
var toPrint = '';

// create a database connection variable outside of the database connection callback
// to reuse the connection pool in the app
// var db;

function getShortRandom() {
  var full = "";
  for (let i = 0; i < 4; i++) {
    full += Math.floor(Math.random() * Math.floor(10));
  }
}

var 

// MATH.RANDOM TO GET SHORTENED URL
// {INPUT : paramUrl, SHORT : RANDOM 4 DIGIT}
// INSERT IT

// connect to the db before starting the app server
mongodb.MongoClient.connect(uri, function(err, database) {
  if (err) {console.log(err); process.exit(1);}
  
  
  toPrint += '<h1>ok, ready?</h1>';
  toPrint += 'connecting to '+paramURL+'<br/>';
  
  var dogs = database.collection('urls');

  dogs.insert(dogData, function(err, results) {
    if (err) throw err;
    dogs.find({name : 'harley'}, function(err, docs) {
      if (err) throw err;
      docs.forEach(function (doc) {
        toPrint += "let's add "+doc['name']+"<br/>";
      });
      dogs.drop(function (err) {
        if (err) throw err;
        database.close(function (err) {
          if (err) throw err;
        });
      });
      
    });
  });

  // save db obj from callback for reuse
 //  db = database;
  console.log('database connection ready');
});


app.listen("3000", function () {
  console.log('Node.js listening ...');
});
