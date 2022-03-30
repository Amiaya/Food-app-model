const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    food:String,
    comment: String,
})

const review = mongoose.model("Review", reviewSchema)
module.exports = review