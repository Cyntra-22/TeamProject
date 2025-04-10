const TotalLike = require('../../domain/entities/totalLike');
const likeRepo = require('../../infra/databases/repositories/likeRepositoryImpl');
const postRepo = require('../../infra/databases/repositories/postRepositoryImpl')

const likePost = async (dto) => {
    const userId = dto.userId;
    const postId = dto.postId;
    const like = await likeRepo.createLike(userId, postId);
    return like;
};

const unlikePost = async (dto) => {
    const userId = dto.userId;
    const postId = dto.postId;
    const result = await likeRepo.deleteLike(userId, postId);
    return result;
};

const getLikesByPost = async (postId) => {
    const likes = await likeRepo.findLikesByPost(postId);
    if (!likes) throw new Error("There are no likes yet");
    return likes;
};

const getAllLikeByUserId = async (id) => {
    const post = await postRepo.findPostByUserId(id);
    let totalLike = 0;
    if (!post) throw new Error("There are no post yet");
    post.forEach(post => {
        totalLike += post.likeAmount
    });
    return new TotalLike({
        userId : id,
        totalLike : totalLike
    });
}

module.exports = { likePost, unlikePost, getLikesByPost, getAllLikeByUserId };