class CommentDto {
  constructor({ postId, description, commentTopicId }) {
    this.postId = postId;
    this.description = description;
    this.commentTopicId = commentTopicId;
  }
}

module.exports = CommentDto;
