var mongoose = require('mongoose');

var partySchema = mongoose.Schema({

  number_of_seats:
  {
    Type: Number
  },
  name:
  {
    Type: String
  },
  absolute_url:
  {
    Type: String
  },
  is_coalition:
  {
    Type: Boolean
  },
  knesset_id:
  {
    Type: Number
  },
  logo:
  {
    Type: Number
  },
  number_of_members:
  {
    Type: Number
  },
  id:
  {
    Type: Number
  },
  resource_uri:
  {
    type: String
  }
});

var Party = module.export = mongoose.model('party', partySchema);

module.exports.getParties = function(callback) {
  Party.find(callback).limit(5);
};