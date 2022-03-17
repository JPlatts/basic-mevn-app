const db = require('./modules/init-db');
const User = require('./models/user');
const Decider = require('./models/decider');



User.deleteMany({  }).then(function(){
  console.log("Users deleted"); // Success
}).catch(function(error){
  console.log(error); // Failure
});

Decider.deleteMany({  }).then(function(){
  console.log("Deciders deleted"); // Success
}).catch(function(error){
  console.log(error); // Failure
});

