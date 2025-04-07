const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/tokenID', authController.IDfromToken);
router.patch('/passwordchange', authController.changePassword);

module.exports = router;