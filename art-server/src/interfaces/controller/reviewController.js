const reviewUsecase = require('../../application/usecases/reviewUsecase');
const ReviewDto = require('../../application/dtos/reviewDto');

const createReviewPost = async (req, res) => {
  try {
    const dto = new ReviewDto(req.body);
    const review = await reviewUsecase.createReview(dto);
    res.status(201).json(review); 
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getAllReviewsByRevieweeId = async (req, res) => {
  try{
    const { _id } = req.body;
    const reviews = await reviewUsecase.getReviewByRevieweeId(_id);
    res.status(200).json(reviews)
  } catch(err){
    res.status(400).json({ message: err.message });
  }
}

module.exports = { createReviewPost, getAllReviewsByRevieweeId };