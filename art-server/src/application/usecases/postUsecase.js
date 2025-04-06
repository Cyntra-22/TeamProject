const postRepo = require("../../infra/databases/repositories/postRepositoryImpl");

const createPost = async (dto) => {
    const postEntity = await postRepo.upsertPost(dto);
    return postEntity;
};

const editPost = async (dto) => {
    if (!dto._id) {
        throw new Error("Post ID is required for updates");
    }

    const existingPost = await postRepo.findPostById(dto._id);
    if (!existingPost) {
        throw new Error("Post not found");
    }

    const postEntity = await postRepo.upsertPost(dto);
    return postEntity;
};

const getPosts = async () => {};

const getPostById = async (id) => {};

const getPostByNameAndTag = async (title, tag) => {};

const getReccomendedPost = async () => {};

const getPostByRanking = async () => {};

module.exports = { createPost, editPost, getPosts, getPostById, getPostByNameAndTag, getReccomendedPost, getPostByRanking };
