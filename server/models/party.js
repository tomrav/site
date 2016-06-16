const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const partySchema = new Schema({
  number_of_seats: Number,
  name: String,
  absolute_url: String,
  is_coalition: Boolean,
  knesset_id: Number,
  logoNumber: String,
  number_of_members: Number,
  id: Number,
  resource_uri: String,
});

const party = module.export = mongoose.model('party', partySchema);

module.exports.getParties = (callback, limit) => {
  party.find(callback).limit(limit);
};
