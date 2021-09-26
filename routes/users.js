const express = require('express');
const router = express.Router();
const users = require('../controllers/users');

router.post('/register', users.registerNewUser);

module.exports = router;