const ReviewRepository = require('../../../domain/repositories/reviewRepository')
const Review = require('../models/reviewModel');
const ReviewEntity = require('../../../domain/entities/review');

class ReviewRepositoryImpl extends ReviewRepository {
  async upsertReview(reviewData) 
  {
    const reviewData = new Review(reviewData);
    const review = await reviewData.save();
    return new ReviewEntity(review)
  }

  async findReviewsByRevieweeId(id)
  {
    const reviewData = Review.find({revieweeId : id})
    if (!reviewData || reviewData.length === 0) return null;

    return reviewData.map(r => new ReviewEntity(r)); 
  }

  async findRevieweeReviewByReviewerId(reviewerId, revieweeId)
  {
    const reviewData = Review.findOne({userId : reviewerId, revieweeId})
    if (!reviewData) return null;
    return new ReviewEntity(reviewData);  
  }
}

module.exports = new ReviewRepositoryImpl();
