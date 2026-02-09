const mongoose = require("mongoose");
const { listingSchema } = require("../JoiSchema");
const listing = require("../models/listingModel");
const Schema=mongoose.Schema;

const reviewSchema = new Schema({
    rating:{
        type:Number,
        required:true,
    },
    comment:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default: Date.now,
    },
    auther: {
        type: Schema.Types.ObjectId,
        ref: "User",
    }
});



module.exports = mongoose.model("review", reviewSchema);