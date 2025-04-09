const commentRepo = require('../../infra/databases/repositories/commentRepositoryImpl');
const userRepo = require('./../../infra/databases/repositories/userRepositoryImpl')

const createComment = async (dto) => {
  const user = await userRepo.findUserById(dto.userId);
  if (!user){
    throw Error("User doesn't exist")
  }

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
  const user = await userRepo.findUserById(dto.userId);
  const existingComment = await commentRepo.findCommentByCommentId(dto.commentId);

  if (!user){
    throw Error("User doesn't exist")
  }

  if (existingComment.userId != dto.userId){
    throw Error("No permisson for editing this post")
  }

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

const deleteComment = async (dto) => {

  const existingComment = await commentRepo.findCommentByCommentId(dto.commentId);

  if (existingComment.userId != dto.userId){
    throw Error("No permisson for deleting this post")
  }

  if (existingComment){
    const deletedComment = await commentRepo.upsertComment({
      commentId: dto.commentId,
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