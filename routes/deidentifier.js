const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    if('abbc' == 'abbc') {
        res.status(200).json({ msg:'Success', response: 'The file as been de-identified.' });
    } else {
        res.status(202).json({ msg:'Failure', response: 'There was a problem.'});
    }
    
    
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg:'Invalid Request' });
  }
});

module.exports = router;