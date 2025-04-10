class ReviewRepository {
  async upsertReview(reviewData) {}

  async findReviewsByRevieweeId(id){}

  async findRevieweeReviewByReviewerId(reviewerId, revieweeId){}

  async findAllReviewByUserId(id){}
}

module.exports = ReviewRepository;
