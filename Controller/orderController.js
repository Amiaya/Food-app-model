const Order = require('../models/order')
const Review = require('../models/review')
const AppError = require('../utils/AppError')
const catchAsync = require('../utils/catchAsync')

exports.createOrder = catchAsync(async (req,res,next) => {
    if(!req.body.user) req.body.user = req.params.userId
    if(req.user._id != req.body.user){
        return next(new AppError('You cannot create an order for this user', 401))
    }
        const newOrder = await Order.create(req.body)
        return res.status(201).json({
            status: 'successful',
            data:{
                order: newOrder
            }
        })
})

exports.getOrder = catchAsync(async (req,res,next)=> {
        if(req.user._id.toString() === req.params.userId ){
            const order = await Order.findById(req.params.id)
            return res.status(200).json({
                status: 'successful',
                data:{
                    order
                }
            })
        }
        else{
            return next(new AppError('You do not have access to this user order ', 401))
        }
       
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