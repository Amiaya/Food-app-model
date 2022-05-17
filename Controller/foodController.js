const food = require('../models/food')
const Food = require('../models/food')
const catchAsync = require('../utils/catchAsync')

exports.createFood = catchAsync(async(req, res , next) => {
    const food = await Food.create(req.body)
    res.status(201).json({
        status: 'successful',
        data:{
            food
        }
    })
})


exports.getAllFood = catchAsync(async (req, res, next) => {
    const foods = await Food.find()
    res.status(201).json({
        status: 'successful',
        result: foods.length,
        data: {
            foods
        }
    })
})

exports.updateFood = catchAsync(async (req, res, next) => {
    const food = await Food.findByIdAndUpdate(req.params.id,req.body, {
        new: true,
        runValidators: true
    })
    res.status(201).json({
        status: 'successful',
        data: {
            food
        }
    })
})

exports.deleteFood = catchAsync(async (req, res, next) => {
    const food = await Food.findByIdAndDelete(req.params.id)
    res.status(204).json({
        status: 'successful',
        data: null
    })
})