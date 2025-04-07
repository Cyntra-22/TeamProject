class CommentDto {
  constructor({ postId, description, commentTopicId, userId }) {
    this.postId = postId;
    this.description = description;
    this.commentTopicId = commentTopicId;
    this.userId = userId;
  }
}

module.exports = CommentDto;
