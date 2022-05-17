const Order = require('../models/order')
const Food = require('../models/food')
const Review = require('../models/review')
const AppError = require('../utils/AppError')
const catchAsync = require('../utils/catchAsync')

exports.createOrder = catchAsync(async (req,res,next) => {
    if(!req.body.user) req.body.user = req.params.userId
    if(req.user._id != req.body.user){
        return next(new AppError('You cannot create an order for this user', 401))
    }
        let cost = 0
        const {menu} = req.body
    
        let foodIdArr = []
        let foodQtyMap ={}
        menu.forEach(item=>{
            foodIdArr.push(item.foodId)
            foodQtyMap[item.foodId] = item.quantity
        })
        const foodArr = await Food.find({_id:{$in:foodIdArr}})
        foodArr.forEach( foodItem => {
            cost += foodItem.price * foodQtyMap[foodItem._id]
            foodItem.food= foodItem.food,
            foodItem.price = foodItem.price
            foodItem.quantity = foodItem.quantity
        });

        
        const orderBody =  {
            menu: foodArr,
            cost,
            userId: req.params.userId
        }
        const newOrder = await Order.create(orderBody)
        return res.status(201).json({
            status: 'successful',
            data:{
                order: newOrder
            }
        })
})

exports.Orders = catchAsync(async (req, res, next) =>{
    const orders = await Order.find()
    return res.status(200).json({
        status: 'successful',
        data:{
            orders
        }
    })
})

exports.getOrder = catchAsync(async (req,res,next)=> {
        if(req.user._id.toString() === req.params.userId ){
            
            const order = await Order.findOne({_id: req.params.id})
            if (order === null){
                return next( new AppError('This Order does not exist'))
            }
            return res.status(200).json({
                status: 'successful',
                data:{
                    order
                }
            })
        }
        else{
            return next(new AppError('You do not have access to this user order', 401))
        }
       
})

exports.getAllOrder = catchAsync(async (req, res, next) =>{
    if(req.user._id.toString() === req.params.userId ){
        const orders = await Order.find({userId: req.params.userId})
        return res.status(200).json({
            status: 'successful',
            data:{
                orders
            }
        })
    }
    else{
        return next(new AppError('You do not have access to this user order', 401))
    }
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

