const likeUsecase = require('../../application/usecases/likeUsecase');
const LikeDto = require('../../application/dtos/likeDto');

const likePost = async (req, res) => {
    try {
        const dto = new LikeDto(req.body.userId, req.body.postId);
        const like = await likeUsecase.likePost(dto);
        res.status(201).json(like); 
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const unlikePost = async (req, res) => {
    try {
        const dto = new LikeDto(req.body.userId, req.body.postId);
        const result = await likeUsecase.unlikePost(dto);
        res.status(200).json(result); 
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const getLikesByPost = async (req, res) => {
    try {
        const likes = await likeUsecase.getLikesByPost(req.body);
        console.log(likes);
        res.status(200).json(likes); 
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

module.exports = { likePost, unlikePost, getLikesByPost };