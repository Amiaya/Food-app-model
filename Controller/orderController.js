const Order = require('../models/order')
const Review = require('../models/review')

exports.createOrder = async (req,res,next) => {
    try {
        const newOrder = await Order.create(req.body)
        return res.status(201).json({
            status: 'successful',
            data:{
                order: newOrder
            }
        })
    } catch (err) {
        return res.status(400).json({
            status: "error",
            message: err
        })
    }
}

exports.getOrder = async (req,res,next)=> {
    try {
        const order = await Order.findById(req.params.id)
        return res.status(200).json({
            status: 'successful',
            data:{
                order
            }
        })

    } catch (err) {
        return res.status(400).json({
            status: "error",
            message: err
        })
    }

}

exports.getAllOrder = async (req, res, next) =>{
    try {
        const orders = await Order.find()
        return res.status(200).json({
            status: 'successful',
            data:{
                orders
            }
        })
    } catch (err) {
        return res.status(400).json({
            status: "error",
            message: err
        })
    }
    

}

exports.review = async (req,res,next) => {
    try {
        const review = await Review.create(req.body)
        return res.status(200).json({
            status: 'successful',
            data:{
                review
            }
        })
    } catch (err) {
        return res.status(400).json({
            status: "error",
            message: err
        })
    }
    
}