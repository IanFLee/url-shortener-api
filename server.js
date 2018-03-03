'use strict';


const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');
var ObjectID = mongodb.ObjectID;

var app = express();

var dogData = 
  {
  name : 'harley',
  age  : 'old'
  }


app.use(express.static("public"));
var uri = process.env.URL;
var toPrint = '';

// create a database connection variable outside of the database connection callback
// to reuse the connection pool in the app
var db;

// connect to the db before starting the app server
mongodb.MongoClient.connect(uri, function(err, database) {
  if (err) {console.log(err); process.exit(1);}
  
  toPrint += '<h1>ok, ready?</h1>';
  toPrint += 'connecting to ?';
  
  var dogs = '';
  
  // save db obj from callback for reuse
  db = database;
  console.log('database connection ready');
});

var user = {
  "user" : process.env.M_LAB_USERNAME,
  "pwd" : process.env.M_LAB_PASSWORD,
  "roles" : [
      {
          "role" : "userAdminAnyDatabase",
          "db" : "url-shortener"
      }
  ]
};


app.listen(process.env.PORT, function () {
  console.log('Node.js listening ...');
});
