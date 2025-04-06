const commentRepo = require('../../infra/databases/repositories/commentRepositoryImpl');
const authUsecase = require('./authUsecase')

const createComment = async (dto) => {

  const commentEntity = await commentRepo.upsertComment({
    postId: dto.postId,
    description: dto.description,
    userId: dto.userId,  
    commentTopicId: dto.commentTopicId,
    recStatus: 1,
    createdWhen: Date.now,
    updatedWhen: null
  });

  return commentEntity
}


const editComment = async (dto) => {
  const updatedComment = await commentRepo.upsertComment({
    commentId: dto.commentId,
    description: dto.description,
    updatedWhen: Date.now(),
    postId: dto.postId,
    commentTopicId: dto.commentTopicId,
    recStatus: 1
  });
  
  return updatedComment;
};

const deleteComment = async (id) => {
  const existingComment = await commentRepo.findCommentByCommentId(id);
  if (existingComment){
    const deletedComment = await commentRepo.upsertComment({
      commentId: id,
      description: existingComment.description,
      postId: existingComment.postId,
      commentTopicId: existingComment.commentTopicId,
      userId: existingComment.userId,
      recStatus: 0,
      updatedWhen: Date.now()
    });

    return deletedComment;
  }
  throw new Error('There is no existing comment');
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