const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');
const userController = require('../controller/userController');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/getProfile', userController.getProfile);

module.exports = router;