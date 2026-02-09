const express = require("express");
const router = express.Router();
const listing = require("../models/listingModel.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema } = require("../JoiSchema.js");
const {isLogedIn, isOwner, validateListing} = require("../middlewere.js");

const listingController = require("../controler/listing.js");

const multer  = require('multer')
const { storage } = require("../cloudConfig.js");
const upload = multer({storage})

//New Route
router.get("/new", isLogedIn,listingController.rendernewPage );

router.route("/")
    .get(wrapAsync(listingController.index))
    .post(isLogedIn,  
        validateListing, 
        wrapAsync(listingController.createListing)
    );
    
    router.route("/:id")
    .get(wrapAsync(listingController.showListing))
    // .put(isLogedIn, isOwner, validateListing, wrapAsync(listingController.updateListing))
    .delete(isLogedIn, isOwner, wrapAsync(listingController.deleteListing)
    );
//edit route
router.get("/:id/edit", 
    isLogedIn, isOwner, 
    upload.single("listing[image]"), 
    wrapAsync(listingController.editListing)
);





//Update route
router.post("/:id", isLogedIn, isOwner, upload.single("listing[image]"), validateListing, wrapAsync(listingController.updateListing));



// At the bottom of your router file
module.exports = router;