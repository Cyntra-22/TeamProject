const mongoose = require('mongoose')
const {Schema} = mongoose

const reviewSchema = new mongoose.Schema({
    rating: { type: Number, required: true },
    description: { type: String, required: true },
    userId : {type: Schema.Types.ObjectId, ref: 'User', required: true},
    revieweeId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    recStatus: {type: Number, default: 1},
    createdWhen: { type: Date, default: Date.now },
    updatedWhen: { type: Date, default: Date.now }
  });
  
  const Review = mongoose.model("Review", reviewSchema);
  
  module.exports = Review;
