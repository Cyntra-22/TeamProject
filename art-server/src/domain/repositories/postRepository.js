class PostRepository {
  async upsertPost(data) {}

  async findPostById(id){}

  async findPostByNameAndTag(title, tag) {}

  async findPostByRanking() {}

  async findReccomendedPost() {}

  async findAllPosts() {}

  async deletePost(id) {}

  async findPostByUserId(userId) {}
}

module.exports = PostRepository;