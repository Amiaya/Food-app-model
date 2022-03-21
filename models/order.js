const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
    price: Number,
    orderTime: Date,
    deliveryTime: Date
})