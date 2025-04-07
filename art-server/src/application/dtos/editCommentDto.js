class EditCommentDto {
  constructor({ commentId, description, userId, postId, commentTopicId }) {
    this.commentId = commentId;
    this.description = description;
    this.userId = userId;
    this.postId = postId;
    this.commentTopicId = commentTopicId;
  }
}

module.exports = EditCommentDto;
