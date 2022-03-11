const express = require('express');
const Decider = require('../models/decider');
const User = require('../models/user');
const router = express.Router();
const jwt = require('jsonwebtoken');
const {JWT_KEY} = require('../modules/config');


router.get('/', async (req, res) => {
  try {
    let user = await req.user.populate('deciders');
    res.status(200).json({ msg:'Success', deciders: user.deciders });
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg:'Invalid Request' });
  }
});

router.post('/add-item', async(req, res) => {
  try {
    let user = await req.user.populate('deciders');
    
    console.log(req.body)
    res.status(200).json({ msg:'Success', deciders: user.deciders });
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg:'Invalid Request' });
  }
});

router.get('/init', async (req, res) => {
  try {
    
    let unpacked = jwt.verify(req.headers.authorization, JWT_KEY);
    let user = await User.findById(unpacked.user._id);
    let d = new Decider();
    d.name = 'Dinner Options';
    d._user = unpacked.user._id;
    d.items.push({text: 'Pizza'});
    d.items.push({text: 'Chicken Sandwiches'});
    d.items.push({text: 'Cheesebugers'});
    d.items.push({text: 'Steak'});
    d.items.push({text: 'Salmon'});
    d.items.push({text: 'Salad'});
    let nd = await d.save();
    user.deciders.push(nd);
    let u = await user.save()

    let d2 = new Decider();
    d2.name = 'What to do on Saturday';
    d2._user = unpacked.user._id;
    d2.items.push({text: 'Surf'});
    d2.items.push({text: 'Ski'});
    d2.items.push({text: 'Learn Node.js'});
    d2.items.push({text: 'Make Chili'});
    d2.items.push({text: 'Run'});
    d2.items.push({text: 'Walk'});
    let nd2 = await d2.save();
    user.deciders.push(nd2);
    let u2 = await user.save()
    res.status(200).json({ msg:'Invalid Request', dec: nd });
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg:'Invalid Request' });
  }
});




module.exports = router;