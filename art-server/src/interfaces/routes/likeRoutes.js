const express = require('express');
const router = express.Router();
const likeController = require('../controller/likeController');

router.post('/likePost', likeController.likePost);
router.delete('/unlikePost', likeController.unlikePost);
router.post('/getLikes', likeController.getLikesByPost);

module.exports = router;