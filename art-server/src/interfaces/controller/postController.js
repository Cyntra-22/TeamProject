const postUsecase = require('../../application/usecases/postUsecase');
const createPostDto = require('../../application/dtos/createPostDto');
const editPostDto = require('../../application/dtos/editPostDto');

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

module.exports = { createPost, editPost };