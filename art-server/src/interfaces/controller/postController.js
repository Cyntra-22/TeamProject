const postUsecase = require('../../application/usecases/postUsecase');
const createPostDto = require('../../application/dtos/createPostDto');
const editPostDto = require('../../application/dtos/editPostDto');
const getPostByIdDto = require('../../application/dtos/getPostByIdDto');
const getPostByNameAndTagDto = require('../../application/dtos/getPostByNameAndTagDto');

const createPost = async (req, res) => {
    try {
        const dto = new createPostDto(req.body);
        const post = await postUsecase.createPost(dto);
        res.status(201).json(post); 
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const editPost = async (req, res) => {
    try {
        const dto = new editPostDto(req.body);
        const post = await postUsecase.editPost(dto);
        res.status(200).json(post); 
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const getPosts = async (req, res) => {
    try {
        const posts = await postUsecase.getPosts();
        res.status(200).json(posts); 
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const getPostById = async (req, res) => {
    try {
        const dto = new getPostByIdDto(req.body);
        const post = await postUsecase.getPostById(dto);
        res.status(200).json(post); 
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const getPostByNameAndTag = async (req, res) => {
    try {
        const dto = new getPostByNameAndTagDto(req.body);
        const post = await postUsecase.getPostByNameAndTag(dto);
        res.status(200).json(post); 
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const getReccomendedPost = async (req, res) => {
    try {
        const posts = await postUsecase.getReccomendedPost();
        res.status(200).json(posts); 
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const getPostByRanking = async (req, res) => {
    try {
        const posts = await postUsecase.getPostByRanking();
        res.status(200).json(posts); 
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

module.exports = { createPost, editPost, getPosts, getPostById, getPostByNameAndTag, getReccomendedPost, getPostByRanking };