const mongoose = require('mongoose');

const deciderSchema = mongoose.Schema({
  name: { 
    type: String,
    required: true,
    unique: true
  }, 
  _user : { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [{text: String}]
});

const Decider = mongoose.model('Decider', deciderSchema);
module.exports = Decider;