const express = require('express');
const router = express.Router();
const followController = require('../controller/followController');

router.post('/follows', followController.follow);
router.delete('/unfollow', followController.unfollow);
router.get('/followers', followController.getFollowers);
router.get('/following', followController.getFollowing);

module.exports = router;