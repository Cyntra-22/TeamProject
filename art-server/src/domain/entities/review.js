class Review {
  constructor({ rating, description, userId, revieweeId, recStatus, createdWhen, updatedWhen }) {
    this.rating = rating;
    this.description = description;
    this.userId = userId;
    this.revieweeId = revieweeId;
    this.recStatus = recStatus;
    this.createdWhen = createdWhen;
    this.updatedWhen = updatedWhen;
  }
}

module.exports = Review;
