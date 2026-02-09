// const { findById } = require("./models/listing");
const listing = require("./models/listingModel.js");
const Review = require("./models/reviewModel.js");

const { listingSchema, reviewSchema } = require("./JoiSchema.js");
const ExpressError = require("./utils/ExpressError.js");

module.exports.isLogedIn = (req, res, next) => {
    console.log(req.user);
    if(!req.isAuthenticated()){
        req.session.redirecturl = req.originalUrl;
        req.flash("error", "You must loged in ");
        return res.redirect("/login");
    }
    next();
}

module.exports.saveRedirectUrl  = (req, res, next) => {
    if(req.session.redirecturl){
        res.locals.redirecturl = req.session.redirecturl;
    }
    next();
};

module.exports.isOwner = async (req, res, next) => {
    let {id} = req.params;
    let data = await listing.findById(id);
    if(!data.owner.equals(res.locals.currentUser._id)){
        req.flash("error", "You are not the owner of listing");
        return res.redirect(`/listning/${id}`)
    }
    next();
};

module.exports.validateListing = (req, res, next) => {
     let { error } = listingSchema.validate(req.body);
    if (error) {
       return next(new ExpressError(400, error));
    } else {
        next();
    }
};

module.exports.validateReview = (req, res, next) => {
     let { error } = reviewSchema.validate(req.body);
    if (error) {
       return next(new ExpressError(400, error));
    } else {
        next();
    }
};

module.exports.isReviewAuther = async (req, res, next) => {
    let {id, reviewId} = req.params;
    let review = await Review.findById(reviewId);
    if(!review.auther.equals(res.locals.currentUser._id)){
        req.flash("error", "You are not the auther of this review");
        return res.redirect(`/listning/${id}`)
    }
    next();
};