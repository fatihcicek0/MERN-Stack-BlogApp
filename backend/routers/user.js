const express = require('express');
const router = express.Router();

const userControllers = require('../controllers/user');

router.post('/login', userControllers.Login);

router.post('/register', userControllers.Register);

module.exports = router;