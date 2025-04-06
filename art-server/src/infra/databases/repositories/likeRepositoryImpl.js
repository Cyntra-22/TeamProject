const LikeRepository = require('../../../domain/repositories/likeRepository');
const Post = require('../models/postModel');
const LikeEntity = require('../../../domain/entities/like');
class LikeRepositoryImpl extends LikeRepository {
    async createLike(userId, postId) {
        const post = await Post.findById(postId);

        if (!post) {
            throw new Error('Post not found');
        }

        const existingLike = post.userLikes.find(like => like && like.toString() === userId.toString());

        if (existingLike) {
            throw new Error('User has already liked this post');
        }

        post.userLikes.push(userId);
        post.likeAmount = (post.likeAmount || 0) + 1;

        await post.save();

        return new LikeEntity({ userId, postId });
    }

    async deleteLike(userId, postId) {
        const post = await Post.findById(postId);

        if (!post) {
            throw new Error('Post not found');
        }

        const likeIndex = post.userLikes.findIndex(like => like.toString() === userId.toString());

        if (likeIndex === -1) {
            throw new Error('Like not found');
        }

        post.userLikes.splice(likeIndex, 1);
        post.likeAmount = (post.likeAmount || 0) - 1;
        
        await post.save();

        return { message: 'Like removed successfully' };
    }

    async findLikesByPost(postId) {
        const post = await Post.findById(postId);

        if (!post) {
            throw new Error('Post not found');
        }

        return post.userLikes.map(like => new LikeEntity({
            userId: like,
            postId: post._id
        }));
    }
}

module.exports = new LikeRepositoryImpl();