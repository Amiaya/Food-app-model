const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    food:String,
    comment: String,
    user: {
        type: mongoose.Schema.ObjectId,
        ref:"User",
        required: [true, "A review must have a user"]
    }
})

const review = mongoose.model("Review", reviewSchema)
module.exports = review