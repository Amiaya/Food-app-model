const User = require('../models/user')
const jwt = require('jsonwebtoken')
const AppError = require('../utils/AppError')
const catchAsync = require('../utils/catchAsync')
const {promisify} = require('util')

const signToken = id => {
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}
exports.signup =catchAsync(async (req,res,next) => {
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            phone: req.body.phoneNo
        })
        const token = signToken(newUser._id)
        newUser.password = undefined

        res.status(200).json({
            status: "success",
            token,
            data: {
                user: newUser
            }
        })
})

exports.login = catchAsync(async (req,res,next) => {
        const {email, password} = req.body
        if(!email || !password){
            return next( new AppError("Please provide an email or password", 400))
        }

        const user = await User.findOne({email}).select('+password')
     

        if(!user || !(await user.correctPassword(password, user.password))){
            return next(new AppError('Incorrect email or password', 401))
        }
    
        const token = signToken(user._id)
        res.status(200).json({
            status: 'success',
            token
        })
})

