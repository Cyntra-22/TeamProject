const likeRepo = require('../../infra/databases/repositories/likeRepositoryImpl');

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

module.exports = { likePost, unlikePost, getLikesByPost };