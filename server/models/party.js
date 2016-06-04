var mongoose = require('mongoose');

var partySchema = mongoose.Schema({

    number_of_seats:Number,
    
    name:String,
    
    absolute_url:String,
    
    is_coalition:Boolean,
    
    knesset_id:Number,
    
    logoNumber:String,
    
    number_of_members:Number,
    
    id:Number,
    
    resource_uri:String
    
});

var party = module.export = mongoose.model('party', partySchema);

module.exports.getParties = function(callback,limit) {
  party.find(callback).limit(limit);
};