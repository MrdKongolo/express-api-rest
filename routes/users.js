const express = require('express');
const checTokenMiddleware = require('../jsonwebtoken/check');

const userCtrl = require('../controllers/user');

let router = express.Router();

/** Middleware for logging date */

router.use((req, res, next) => {
    const event = new Date();
    console.log('User Time', event.toString());
    next();
});

router.get('/', userCtrl.getAllUsers);

router.get('/:id', userCtrl.getUser);

router.put('', userCtrl.addUser);

router.patch('/:id', userCtrl.updateUser);

router.delete('/trash/:id', userCtrl.trashUser);

router.post('/untrash/:id', userCtrl.untrashUser);

router.delete('/:id', userCtrl.deleteUser);
 
module.exports = router;