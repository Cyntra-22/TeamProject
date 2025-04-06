const express = require('express');
const router = express.Router();
const postController = require('../controller/postController');

router.post('/create', postController.createPost);
router.put('/edit', postController.editPost);
router.get('/getPosts', postController.getPosts);
router.get('/getPostById', postController.getPostById);
router.get('/getPostByNameAndTag', postController.getPostByNameAndTag);

module.exports = router;
