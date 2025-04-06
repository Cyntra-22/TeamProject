class PostRepository {
  async upsertPost(data) {}

  async findPostById(id){}

  async findPostByNameAndTag(title, tag) {}

  async findPostByRanking() {}

  async findReccomendedPost() {}

  async findAllPosts() {}
}

module.exports = PostRepository;