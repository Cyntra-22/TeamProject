const ReviewRepository = require('../../../domain/repositories/reviewRepository')
const Review = require('../models/reviewModel');
const ReviewEntity = require('../../../domain/entities/review');

class ReviewRepositoryImpl extends ReviewRepository {
  async upsertReview(reviewData) 
  {
    const reviewdata = new Review(reviewData);
    const review = await reviewdata.save();
    return new ReviewEntity(review)
  }

  async findReviewsByRevieweeId(id)
  {
    const reviewData = Review.find({revieweeId : id, recStatus: { $ne: 0 }})
    if (!reviewData || reviewData.length === 0) return null;

    return reviewData.map(r => new ReviewEntity(r)); 
  }

  async findRevieweeReviewByReviewerId(reviewerId, revieweeId)
  {
    const reviewData = Review.findOne({userId : reviewerId, revieweeId, recStatus: { $ne: 0 }})
    if (!reviewData) return null;
    return new ReviewEntity(reviewData);  
  }
}

module.exports = new ReviewRepositoryImpl();
