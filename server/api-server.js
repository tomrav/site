const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Party = require('./models/party.js');
// var db = mongoose.connection;
// var bodyParser = require('body-parser'); 		// uncomment once we know what we need this for

// connect to mongoose
mongoose.connect('mongodb://localhost/tzibur', (err) => {
  if (err) {
    throw err;
  }
  console.log('Mongo is up');
}); // STRING FOR CONNECTING TO DATABASE LOCALLY

// function returnJson (err, stuff){
//   if(err){
//     throw err;
//   }
//   res.json(stuff);
// }

app.get('/', (req, res) => {
  res.end('FUCK OFF!');
});

app.get('/api/party', (req, res) => {
  Party.getParties((err, parties) => {
    if (err) {
      throw err;
    }
    res.json(parties);
  });
});

app.listen(3000);
console.log('listening port 3000');
