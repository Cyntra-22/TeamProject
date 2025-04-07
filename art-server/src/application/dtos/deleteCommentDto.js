class DeleteCommentDto {
  constructor({ commentId, userId }) {
    this.commentId = commentId;
    this.userId = userId;
  }
}

module.exports = DeleteCommentDto;
