class EditCommentDto {
  constructor({ commentId, description }) {
    this.commentId = commentId;
    this.description = description;
  }
}

module.exports = EditCommentDto;
