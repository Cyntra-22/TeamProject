const express = require('express');
const router = express.Router();
const reviewController = require('../controller/reviewController');

router.post('/create', reviewController.createReviewPost);
router.post('/getAllReviewsByRevieweeId', reviewController.getAllReviewsByRevieweeId);
router.post('/getAllRatingByUserId', reviewController.getAllRatingByUserId);
module.exports = router;