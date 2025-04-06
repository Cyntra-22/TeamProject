class CommentRepository {
  async upsertComment(commentData) {}

  async findCommentsByPostId(PostId){}

  async findCommentsByCommentId(commmentId){}

  async findCommentByCommentId(commentId){}
}

module.exports = CommentRepository;
