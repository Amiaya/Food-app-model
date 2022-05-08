const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
    food: {
        type: String,
        required: [true, 'Must have a food name']
    },
    description: String,
    quantity: {
        type: Number,
        default: 2.5,
        min: [1,'Rating must be greater than 1.0'],
        max: [5,'Rating must be less than 5.0']
    },
    user: [
        {
        type: mongoose.Schema.ObjectId,
        ref:"User",
        required: [true, "An Order must have a user"]
    }
]
})

const order = mongoose.model('Order', OrderSchema)
module.exports = order