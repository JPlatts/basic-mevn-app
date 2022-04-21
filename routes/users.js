const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const {JWT_KEY,FIRST,LAST,USERNAME,PASSWORD} = require('../modules/config');

router.post('/authenticate', async (req, res) => {
  try {
    
    let user = {
      _id: 1,
      email: USERNAME, 
      firstName: FIRST, 
      lastName: LAST
    }
    console.log(req.body);
    if(req.body.email == user.email && req.body.password == PASSWORD) {
      const accessToken = jwt.sign({ user: user, created: new Date()}, JWT_KEY);
      res.status(200).json({user: user, token: accessToken, msg:'success' });
    } else {
      res.status(202).json({ msg:'Authentication Failed' });
    }
  } catch (err) {
    res.status(400).json({ msg:'Invalid Request' });
  }
  
});

router.post('/reauthenticate', async (req, res) => {
  try {

    let unpacked = jwt.verify(req.body.token, JWT_KEY);
    let user = null;
    if (unpacked.user._id = 1) {
      user = {
        _id: 1,
        email: USERNAME, 
        firstName: FIRST, 
        lastName: LAST
      }
    }
    if(!user) {
      console.log('reauth user not found')
    }
    if(unpacked && unpacked.user && user) {
      res.status(200).json({user: unpacked.user, token: req.body.token, msg:'success' });
    } else {
      res.status(202).json({ msg:'Authentication Failed' });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg:'Invalid Request' });
  }
  
});


module.exports = router;