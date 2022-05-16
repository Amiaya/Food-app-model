const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
    menu: [],
    cost:  Number,
    userId:{
        type: mongoose.Schema.ObjectId,
        ref:"User",
        required: [true, "An Order must have a user"]
    }
}, {timestamps: true})

const order = mongoose.model('Order', OrderSchema)
module.exports = order