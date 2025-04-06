const express = require('express');
const router = express.Router();
const likeController = require('../controller/likeController');

router.post('/Post', likeController.likePost);
router.delete('/unlikePost', likeController.unlikePost);
router.get('/gets', likeController.getLikesByPost);

module.exports = router;