'use strict';


const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');
var ObjectID = mongodb.ObjectID;

var app = express();
var CONTACTS_COLLECTION = "contacts";


app.use(express.static(__dirname+"/public"));
app.use(bodyParser.json());

// create a database connection variable outside of the database connection callback
// to reuse the connection pool in the app
var db;

// connect to the db before starting the app server
mongodb.MongoClient.connect(process.env.URL, function(err, database) {
  if (err) {console.log(err); process.exit(1);}
  
  // save db obj from callback for reuse
  db = database;
  console.log('database connection ready');
  
  // Initialize the app.
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
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

