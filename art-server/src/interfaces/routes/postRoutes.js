const express = require('express');
const router = express.Router();
const postController = require('../controller/postController');

router.post('/createPost', postController.createPost);
router.put('/editPost', postController.editPost);

module.exports = router;
