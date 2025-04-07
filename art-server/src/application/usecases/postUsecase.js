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

const getPosts = async () => {
    const postEntity = await postRepo.findAllPosts();
    if (!postEntity) throw new Error("There are no posts yet");
    return postEntity;
};

const getPostById = async (id) => {
    const postEntity = await postRepo.findPostById(id);
    if (!postEntity) throw new Error("There are no posts yet");
    return postEntity;
};

const getPostByNameAndTag = async (dto) => {
    const title = dto.title;
    const tag = dto.taggedTopic;

    const postEntity = await postRepo.findPostByNameAndTag(title, tag);

    if (!postEntity) throw new Error("There are no posts yet");
    return postEntity;
};

const getReccomendedPost = async () => {
    const postEntity = await postRepo.findReccomendedPost();
    if (!postEntity) throw new Error("There are no posts yet");
    return postEntity;
};

const getPostByRanking = async () => {
    const postEntity = await postRepo.findPostByRanking();
    if (!postEntity) throw new Error("There are no posts yet");
    return postEntity;
};

module.exports = { createPost, editPost, getPosts, getPostById, getPostByNameAndTag, getReccomendedPost, getPostByRanking };
