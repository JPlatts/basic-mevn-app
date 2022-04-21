const jwt = require('jsonwebtoken');
const {JWT_KEY} = require('../modules/config');

async function auth(req, res, next) {
  try
  {
    let unpacked = jwt.verify(req.headers.authorization, JWT_KEY);
    let user = null;
    if(unpacked && unpacked.user && unpacked.user._id === 1) {
      user = unpacked.user;
    }
    if (!!user) {
      req.user = user;
      next();
    } else {
      res.status(400).json({ msg:'Unauthorized' });  
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg:'Unauthorized' });  
  }
}
module.exports = auth;