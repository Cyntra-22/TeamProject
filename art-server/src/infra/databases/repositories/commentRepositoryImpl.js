const CommentRepository = require('../../../domain/repositories/commentRepository')
const Comment = require('../models/commentModel');
const CommentEntity = require('../../../domain/entities/comment');

class CommentRepositoryImpl extends CommentRepository {
  async upsertComment(commentData) {
    const { _id, description, postId, userId, commentTopicId, recStatus } = commentData;
  
    let comment;
    
    if (_id) {
      comment = await Comment.findByIdAndUpdate(
        _id, 
        { 
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
    const commentData = Comment.find({postId, recStatus: { $ne: 0 }})
    if (!commentData || commentData.length === 0) return null;

    return commentData.map(c => new CommentEntity(c)); 
  }

  async findCommentsByCommentId(commentId)
  {
    const commentData = Comment.find({commentTopicId: commentId, recStatus: { $ne: 0 }})
    if (!commentData || commentData.length === 0) return null;

    return commentData.map(c => new CommentEntity(c)); 
  }
}

module.exports = new CommentRepositoryImpl();
