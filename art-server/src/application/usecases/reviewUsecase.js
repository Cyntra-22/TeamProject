const AverageRating = require('../../domain/entities/averageRating');
const reviewRepo = require('../../infra/databases/repositories/reviewRepositoryImpl');
const userRepo = require('../../infra/databases/repositories/userRepositoryImpl');

const getReviewsByRevieweeId = async (id) => {
  const reviewEntity = await reviewRepo.findReviewsByRevieweeId(id);
  if (!reviewEntity) throw new Error('There is no review yet');
  return reviewEntity
};

const createReview = async (dto) => {
  const user = await userRepo.findUserById(dto.userId);
  if (!user) {throw new Error('User does not exist')} 
  if (dto.userId === dto.revieweeId) {throw new Error('User cannot review themself')}
  const existingReview = await reviewRepo.findRevieweeReviewByReviewerId(dto.userId, dto.revieweeId);
  if (existingReview) throw new Error('You already left a review!');

  const reviewEntity = await reviewRepo.upsertReview({
    rating: dto.rating,
    description: dto.description,
    userId: dto.userId,  
    revieweeId: dto.revieweeId,
    recStatus: 1,
    createdWhen: Date.now(),
    updatedWhen: null
  });

  return reviewEntity
}

const getAllRatingByUserId = async (id) => {
  const ratings = await reviewRepo.findAllReviewByUserId(id);
  if (ratings){
    let totalRating = 0;
    const totalReview = ratings.length
    ratings.forEach(rating => {
      totalRating += rating.rating
    });
    var averageRating = totalRating/ totalReview
    return new AverageRating({
      userId : id,
      totalRating : averageRating,
      totalReview : totalReview
    });
  }
}

module.exports = { getReviewsByRevieweeId, createReview, getAllRatingByUserId};