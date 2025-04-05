const commentRepo = require('../../infra/databases/repositories/commentRepositoryImpl');

const createComment = async (dto) => {
  const userDummy = "000-000-000-000" //TODO : replace with get user id by token

  const commentEntity = await commentRepo.upsertComment({
    postId: dto.postId,
    description: dto.description,
    userId: userDummy,  
    commentTopicId: dto.commentTopicId,
    recStatus: dto.recStatus,
    createdWhen: Date.now,
    updatedWhen: null
  });

  return commentEntity
}


const editComment = async (dto) => {
  const updatedComment = await commentRepo.upsertComment({
    id: dto.commentId,
    description: dto.description,
    updatedWhen: Date.now(),
  });
  
  return updatedComment;
};

const deleteComment = async (commentId) => {
  const deletedComment = await commentRepo.upsertComment({
    _id: commentId,
    recStatus: 0,
    updatedWhen: Date.now(),
  });

  return deletedComment;
};

const getCommentsByPostId = async (id) => {
  const commentEntity = await commentRepo.findCommentsByPostId(id);
  if (!commentEntity) throw new Error('There is no comment yet');
  return commentEntity
};

const getCommentsByCommentId = async (id) => {
  const commentEntity = await commentRepo.findCommentsByCommentId(id);
  if (!commentEntity) throw new Error('There is no comment yet');
  return commentEntity
};

module.exports = { createComment, editComment, deleteComment, getCommentsByPostId, getCommentsByCommentId};