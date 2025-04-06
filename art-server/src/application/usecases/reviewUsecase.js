const reviewRepo = require('../../infra/databases/repositories/reviewRepositoryImpl');

const getReviewsByRevieweeId = async (id) => {
  const reviewEntity = await reviewRepo.findReviewsByRevieweeId(id);
  if (!reviewEntity) throw new Error('There is no review yet');
  return reviewEntity
};

const createReview = async (dto) => {
  const existingReview = await reviewRepo.findRevieweeReviewByReviewerId(dto.userId, dto.revieweeId);
  if (existingReview) throw new Error('You already left a review!');

  const reviewEntity = await reviewRepo.upsertReview({
    rating: dto.rating,
    description: dto.description,
    userId: dto.userId,  
    revieweeId: dto.revieweeId,
    recStatus: 1,
    createdWhen: Date.now,
    updatedWhen: null
  });

  return reviewEntity
}

module.exports = { getReviewsByRevieweeId, createReview};