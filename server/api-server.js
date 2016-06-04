var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Party = require('./models/party.js');
//connect to mongoose
mongoose.connect('mongodb://localhost/tzibur'); //STRING FOR CONNECTING TO DATABASE LOCALLY
var db = mongoose.connection;


function returnJson (err, stuff){
  if(err){
    throw err;
  }
  res.json(stuff);
}

app.get('/', function(req, res)  {
    res.end('FUCK OFF!');
});

app.get('/api/party', function(req, res) {
  Party.getParties(returnJson(err,parties));
});

app.listen(3000);
console.log('listening port 3000');
