const User = require('../models/user')
const jwt = require('jsonwebtoken')
const AppError = require('../utils/AppError')

const signToken = id => {
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}
exports.signup = async (req,res,next) => {
    try {
        const newUser = await User.create(req.body)
        const token = signToken(newUser._id)
        return res.status(400).json({
            status: "success",
            token,
            data: {
                user: newUser
            }
        })
    } catch (err) {
        return res.status(400).json({
            status: "error",
            message: err
        })
    }
}

exports.login = async (req,res,next) => {
    try {
        const {email, password} = req.body
        if(!email || !password){
            return next( new AppError("Please provide an email or password", 400))
        }

        const user = await User.findOne({email})
     

        if(!user || !(await user.correctPassword(password, user.password))){
            return next(new AppError('Incorrect email or password', 401))
        }
    
        const token = signToken(user._id)
        res.status(200).json({
            status: 'success',
            token
        })
        
    } catch (err) {
        res.status(400).json({
            status: "error",
            message: err
        })
    }
}
