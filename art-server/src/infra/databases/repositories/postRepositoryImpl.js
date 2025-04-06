const Post = require('../models/postModel');
const PostRepository = require('../../../domain/repositories/postRepository');
const PostEntity = require('../../../domain/entities/post');
class PostRepositoryImpl extends PostRepository {
    async upsertPost(data) {
        if (data._id) {
            // Update existing post
            return await Post.findByIdAndUpdate(
                data._id,
              { ...data, updatedWhen: Date.now() },
              { new: true, runValidators: true }
            );
        } else {
            // Create new post
            const post = new Post(data);
            const savedPost = await post.save();

            return new PostEntity(savedPost);
        }
    }

    async findPostById(id) {
        const postData = await Post.findById(id);
        if (!postData) return null;

        return new PostEntity(postData);
    }
  
    async findPostByNameAndTag(title, tag) {}
  
    async findPostByRanking() {}
  
    async findReccomendedPost() {}
}

module.exports = new PostRepositoryImpl();