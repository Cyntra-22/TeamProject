class ReviewRepository {
  async upsertReview(reviewData) {}

  async findReviewsByRevieweeId(id){}

  async findRevieweeReviewByReviewerId(reviewerId, revieweeId){}
}

module.exports = ReviewRepository;
