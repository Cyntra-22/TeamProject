const express = require('express');
const router = express.Router();
const profileController = require('../controller/profileController');

router.post('/getById', profileController.getProfile);
router.patch('/edit', profileController.editProfile);
router.get('/getArtist', profileController.getArtists);

module.exports = router;