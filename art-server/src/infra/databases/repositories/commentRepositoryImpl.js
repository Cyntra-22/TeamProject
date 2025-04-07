const { ObjectId } = require('mongodb');

const CommentRepository = require('../../../domain/repositories/commentRepository')
const Comment = require('../models/commentModel');
const CommentEntity = require('../../../domain/entities/comment');


class CommentRepositoryImpl extends CommentRepository {
  async upsertComment(commentData) {
    const { commentId, description, postId, userId, commentTopicId, recStatus } = commentData;
  
    let comment;
    if (commentId) {
      
      comment = await Comment.findByIdAndUpdate(
        new ObjectId(commentId), 
        { 
          userId,
          description, 
          recStatus,
          updatedWhen: Date.now(), 
        },
        { new: true }
      );
    } else {
      comment = new Comment({
        postId,
        description,
        userId,
        commentTopicId,
        recStatus: 1,
        createdWhen: Date.now(), 
        updatedWhen: null,
      });
      await comment.save();
    }
    return new CommentEntity(comment);
  }
  async findCommentsByPostId(postId)
  {
    const commentData = await Comment.find({postId: new ObjectId(postId), recStatus: 1})
    if (!commentData || commentData.length === 0) return null;

    return commentData.map(c => new CommentEntity(c)); 
  }

  async findCommentsByCommentId(commentId)
  {
    const commentData = await Comment.find({commentTopicId: new ObjectId(commentId), recStatus: 1})
    if (!commentData || commentData.length === 0) return null;

    return commentData.map(c => new CommentEntity(c)); 
  }

  async findCommentByCommentId(commentId)
  {
    const commentData = await Comment.findOne({_id: new ObjectId(commentId), recStatus: 1})
    return new CommentEntity(commentData)
  }
}

module.exports = new CommentRepositoryImpl();
