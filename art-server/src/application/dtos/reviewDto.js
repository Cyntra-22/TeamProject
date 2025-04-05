class ReviewDto {
  constructor({ rating, description, userId }) {
    this.rating = rating;
    this.description = description;
    this.userId = userId;
  }
}

module.exports = ReviewDto;
