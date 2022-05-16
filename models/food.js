const mongoose = require('mongoose')

const foodSchema = new mongoose.Schema({
    food: {
        type: String,
        required: [true, 'Must have a food name'], 
        unique: true,
        trim: true,
        maxlength: [15, 'A tour name must have less than or equal to 15 characters'],
        minlength: [4, 'A tour name must have greater than or equal to 4 characters'],
    },
    price:{
        type: Number,
        require: [true, 'Must have a price'],
    }
}, {timestamps: true})

const food = mongoose.model('Food', foodSchema)
module.exports = food   