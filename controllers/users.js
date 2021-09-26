const User = require('../models/user');

exports.registerNewUser = async (req, res) => {
    try {
      console.log(req.body);
      res.status(200).json({okay:'cupid'});
    } catch (err) {
      res.status(400).json({ err: err });
    }
  };