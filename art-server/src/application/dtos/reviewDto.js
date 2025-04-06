class ReviewDto {
  constructor({ rating, description, userId, revieweeId }) {
    this.rating = rating;
    this.description = description;
    this.userId = userId;
    this.revieweeId = revieweeId 
  }
}

module.exports = ReviewDto;
