const listing = require("../models/listingModel");


module.exports.index = async (req, res) => {
    const allListning = await listing.find({});
    res.render("listning/index.ejs", { allListning });
};

module.exports.rendernewPage = (req, res) => {
    res.render("listning/add.ejs");
};

module.exports.createListing = async (req, res) => {
    let newListning = new listing(req.body.listing);

    let url = req.file.path;
    let filename = req.file.filename;
    newListning.image = { url, filename };

    newListning.owner = req.user._id;
    await newListning.save();
    console.log(newListning);

    req.flash("success", "Successfully Created A New Listing");
    res.redirect("/listning");
};

module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    const foundListing = await listing.findById(id)
        .populate({
            path: "review",
            populate: {
                path: "auther"
            },
        })
        .populate("owner");
    res.render("listning/show.ejs", { foundListing })
    // console.log(data);
};

module.exports.editListing = async (req, res) => {
    let { id } = req.params;
    const foundListing = await listing.findById(id);
    if (!foundListing) {
        req.flash("error", "Cannot find that listing");
        return res.redirect("/listning");
    }
    const originalUrl = foundListing.image.url;
    const originalImageUrl = originalUrl.replace("/upload", "/upload/h_250,w_200");
    console.log(originalImageUrl);
    res.render("listning/edit.ejs", { foundListing, originalImageUrl })
    // console.log(originalImage);
};


module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    const updatedListing = await listing.findByIdAndUpdate(id, { ...req.body.listing });

    if (typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        updatedListing.image = { url, filename };
        updatedListing.save();
    }
    req.flash("success", "Successfully Updated The Listing");
    res.redirect(`/listning/${id}`);
    console.log(updatedListing);
};

module.exports.deleteListing = async (req, res) => {
    let { id } = req.params;
    let data = await listing.findByIdAndDelete(id);
    res.redirect("/listning");
    console.log(data);
};
