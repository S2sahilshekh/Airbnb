const express = require("express");
const router = express.Router({ mergeParams: true });
const review = require("../models/reviewModel.js");
const listing = require("../models/listingModel.js");
const { reviewSchema } = require("../JoiSchema.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {isLogedIn, isOwner, validateReview, isReviewAuther} = require("../middlewere.js");

const reviewController = require("../controler/review.js");


//Create Review Route

router.post("/",isLogedIn, 
    validateReview, 
    wrapAsync(reviewController.createReview));

// Delete Review Route

router.delete("/:reviewId",isLogedIn,
     isReviewAuther,
     wrapAsync(reviewController.deleteReview));

module.exports = router;