const Post = require("../models/postModel");
const PostRepository = require("../../../domain/repositories/postRepository");
const PostEntity = require("../../../domain/entities/post");
const mongoose = require("mongoose");

class PostRepositoryImpl extends PostRepository {
    async upsertPost(data) {
        if (data._id) {
          
            return await Post.findByIdAndUpdate(
                data._id,
                { ...data, updatedWhen: Date.now() },
                { new: true, runValidators: true }
            );
        } else {
            
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
        if (!title && tag.length === 0) return null;
        const filter = { recStatus: { $ne: 0 } };

        if (title) {
            filter.title = { $regex: title, $options: "i" };
        }
        if (tag.length > 0) {
            filter.taggedTopic = { $all: tag };
        }

        const postData = await Post.find(filter);

        if (!postData || postData.length === 0) return null;
        return postData.map((post) => new PostEntity(post));
    }

    async findPostByRanking() {
        const postData = await Post.find({ recStatus: { $ne: 0 } })
            .sort({ likeAmount: -1 })
            .limit(10);
        if (!postData || postData.length === 0) return null;

        return postData.map((p) => new PostEntity(p));
    }

    async findReccomendedPost() {
        const postData = await Post.find({ recStatus: { $ne: 0 } }).sort({
            createdWhen: -1,
        });
        if (!postData || postData.length === 0) return null;

        return postData.map((p) => new PostEntity(p));
    }

    async findAllPosts() {
        const postData = await Post.find({ recStatus: { $ne: 0 } });
        if (!postData || postData.length === 0) return null;

        return postData.map((p) => new PostEntity(p));
    }

    async deletePost(id) {
        if (!id) return null;
        const postData = await Post.findByIdAndUpdate(id, { recStatus: 0 });
        if (!postData) return null;

        return new PostEntity(postData);
    }

    async findPostByUserId(userId) {
        try {
            
            const objectIdUserId = mongoose.Types.ObjectId.createFromHexString(userId);
            const postData = await Post.find({
                userId: objectIdUserId,
                recStatus: { $ne: 0 },
            });
            if (!postData || postData.length === 0) return null;

            return postData.map((p) => new PostEntity(p));
        } catch (error) {
            console.error("Error in findPostByUserId:", error.message);
            return null;
        }
    }
}

module.exports = new PostRepositoryImpl();
