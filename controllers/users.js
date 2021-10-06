const User = require('../models/user');


exports.registerNewUser = async (req, res) => {
  try {
    if (!User.validateNewUser(req.body)) {
      res.status(400).json({ msg: 'Invalid Request.' });
    } else if(await User.userExistsWithEmail(req.body.email)) {
      res.status(202).json({isSuccess: false, msg: 'An account already exists for this email address.'})
    } else {
      let u = await User.createAndSave(req.body);
      if(u) {
        res.status(200).json({isSuccess: true, msg:'Success', user: await User.desensitize(u) });
      } else {
        res.status(400).json({ msg: 'User registration failed' });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg:'User registration failed.', err: err });
  }
};