const express = require('express');
const router = express.Router();
const postController = require('../controller/postController');

router.post('/create', postController.createPost);
router.put('/edit', postController.editPost);
router.get('/getPosts', postController.getPosts);
router.post('/getPostById', postController.getPostById);
router.post('/getPostByNameAndTag', postController.getPostByNameAndTag);
router.get('/getReccomended', postController.getReccomendedPost);
router.get('/getRanking', postController.getPostByRanking);
router.delete('/delete', postController.deletePost);
router.post('/getPostByUserId', postController.getPostByUserId);

module.exports = router;
