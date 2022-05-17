const User = require('../models/user')
const jwt = require('jsonwebtoken')
const AppError = require('../utils/AppError')
const catchAsync = require('../utils/catchAsync')
const {promisify} = require('util')
const { resolveSoa } = require('dns')

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

exports.adminSignup =catchAsync(async (req,res,next) => {
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phoneNo,
        role: "admin"
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
        user.password = undefined
        res.status(200).json({
            status: 'success',
            token,
            data:{
                user
            }
        })
})

exports.protect = catchAsync(async (req,res,next) => {
    // 1) Getting token and check if it's there
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1]
    }
    if(!token){
        return next(new AppError('You are not login, Please Login to get access',401))
    }

    // 2) verification of token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)

    // 3) check if the user still exist
    const currentUser = await  User.findById(decoded.id)
    if(!currentUser){
        return next(new AppError('The user belonging to this token no longer exist', 401))
    }

    req.user = currentUser

    next()
})

exports.restrictTo = (...role) => {
    return (req, res, next) =>  {
        if (!role.includes(req.user.role)){
            return next (new AppError('You do not have permission to perform this action', 403))
        }
        next()
    }
}