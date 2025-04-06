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
  
    async findPostByNameAndTag(title = null, tag) {

        if (!title && tag.length === 0 ) return null;
        const filter = { recStatus: { $ne: 0 } };
        
        if (title) {
            filter.title = { $regex: title, $options: 'i' };
        }
        if (tag.length > 0) {
            filter.taggedTopic = { $all: tag };
        }

        const postData = await Post.find(filter);

        if (!postData || postData.length === 0) return null;
        return postData.map(post => new PostEntity(post));
    }
  
    async findPostByRanking() {}
  
    async findReccomendedPost() {}

    async findAllPosts() {
        const postData = await Post.find({ recStatus: { $ne: 0 } });
        if (!postData || postData.length === 0) return null;

        return postData.map(p => new PostEntity(p));
    }
}

module.exports = new PostRepositoryImpl();