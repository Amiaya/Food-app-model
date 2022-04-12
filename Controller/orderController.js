const Order = require('../models/order')
const Review = require('../models/review')
const catchAsync = require('../utils/catchAsync')

exports.createOrder = catchAsync(async (req,res,next) => {
        const newOrder = await Order.create(req.body)
        return res.status(201).json({
            status: 'successful',
            data:{
                order: newOrder
            }
        })
})

exports.getOrder = catchAsync(async (req,res,next)=> {
        const order = await Order.findById(req.params.id)
        return res.status(200).json({
            status: 'successful',
            data:{
                order
            }
        })

})

exports.getAllOrder = catchAsync(async (req, res, next) =>{
        const orders = await Order.find()
        return res.status(200).json({
            status: 'successful',
            data:{
                orders
            }
        })
})

exports.review = catchAsync(async (req,res,next) => {
        const review = await Review.create(req.body)
        return res.status(200).json({
            status: 'successful',
            data:{
                review
            }
        })
    
})