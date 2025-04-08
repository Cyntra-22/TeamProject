const express = require('express');
const router = express.Router();
const followController = require('../controller/followController');

router.post('/follows', followController.follow);
router.patch('/unfollow', followController.unfollow);
router.post('/followers', followController.getFollowers);
router.post('/following', followController.getFollowing);

module.exports = router;