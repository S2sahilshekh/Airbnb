
const review = require("../models/reviewModel");
const listing = require("../models/listingModel");

module.exports.createReview = async (req, res) => {
    let { id } = req.params;
    const foundListing = await listing.findById(id);
    let newReview = new review(req.body.review);

    newReview.auther = req.user._id;

    foundListing.review.push(newReview);
    console.log(newReview);
    await newReview.save();
    await foundListing.save();
    console.log(newReview);
    req.flash("success", "Review Added Successfully");
    res.redirect(`/listning/${id}`);
};

module.exports.deleteReview = async (req, res) => {
    let { id, reviewId } = req.params;
    let foundListing = await listing.findByIdAndUpdate(id, { $pull: { review: reviewId } });
    let deleteReview = await review.findByIdAndDelete(reviewId);
    console.log(deleteReview);
    // console.log(foundListing);
    req.flash("success", "Review Deleted Successfully");
    res.redirect(`/listning/${id}`);
};