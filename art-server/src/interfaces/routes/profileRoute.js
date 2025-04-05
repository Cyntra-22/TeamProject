const express = require('express');
const router = express.Router();
const profileController = require('../controller/profileController');

router.get('/getProfile', profileController.getProfile);
router.patch('/editProfile', profileController.editProfile);

module.exports = router;