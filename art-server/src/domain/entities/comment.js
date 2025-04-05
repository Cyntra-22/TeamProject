class Comment {
  constructor({_id ,postId, description, userId, commentTopicId, recStatus, createdWhen, updatedWhen }) {
    this.id = _id;
    this.postId = postId;
    this.description = description;
    this.userId = userId;
    this.commentTopicId = commentTopicId;
    this.recStatus = recStatus;
    this.createdWhen = createdWhen;
    this.updatedWhen = updatedWhen;
  }
}

module.exports = Comment;
