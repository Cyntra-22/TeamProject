class PostRepository {
  async upsertPost(data) {}

  async findPostById(id){}

  async findPostByNameAndTag(title, tag) {}

  async findPostByRanking() {}

  async findReccomendedPost() {}
}

module.exports = PostRepository;