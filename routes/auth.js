const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authCtrl = require('../controllers/auth');

const User = require('../models/user');

let router = express.Router();

/** Middleware for logging date */

router.use((req, res, next) => {
    const event = new Date();
    console.log('Auth Time', event.toString());
    next();
});

/** Auth Routing */
router.post('/login', authCtrl.login);

module.exports = router;