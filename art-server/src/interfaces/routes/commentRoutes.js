const express = require('express');
const router = express.Router();
const commentController = require('../controller/commentController');

router.post('/create', commentController.createComment);
router.patch('/edit', commentController.editComment);
router.delete('/delete', commentController.deleteComment);
router.get('/getByPostId', commentController.getAllCommentsByPostId);
router.get('/getByCommentId', commentController.getAllCommentsByCommentId);

module.exports = router;