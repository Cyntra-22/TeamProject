const commentUsecase = require('../../application/usecases/commentUsecase');
const CommentDto = require('../../application/dtos/commentDto');
const EditCommentDto = require('../../application/dtos/editCommentDto');
const DeleteCommentDto = require('../../application/dtos/deleteCommentDto');

const createComment = async (req, res) => {
  try {
    const dto = new CommentDto(req.body);
    const comment = await commentUsecase.createComment(dto);
    res.status(201).json(comment); 
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const editComment = async (req, res) => {
  try {
    const dto = new EditCommentDto(req.body);
    const comment = await commentUsecase.editComment(dto);
    res.status(201).json(comment); 
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteComment = async (req, res) => {
  try {
    const dto = new DeleteCommentDto(req.body)
    const comment = await commentUsecase.deleteComment(dto);
    res.status(201).json(comment); 
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getAllCommentsByCommentId = async (req, res) => {
  try{
    const { id } = req.body;
    const comments = await commentUsecase.getCommentsByCommentId(id);
    res.status(200).json(comments)
  } catch(err){
    res.status(400).json({ message: err.message });
  }
}

const getAllCommentsByPostId = async (req, res) => {
  try{
    const { id } = req.body;
    const comments = await commentUsecase.getCommentsByPostId(id);
    res.status(200).json(comments)
  } catch(err){
    res.status(400).json({ message: err.message });
  }
}




module.exports = { createComment, editComment, deleteComment, getAllCommentsByPostId, getAllCommentsByCommentId };