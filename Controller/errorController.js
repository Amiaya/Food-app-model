const AppError = require('../utils/AppError')

const handleCastErrorDB = err => {
    const message = `invalid ${err.path}: ${err.value}`
    return new AppError(message,400)
}

const handleDuplicatedFieldDB = err => {
    const value = err.keyValue.email
    const message = `Duplicate field value: ${value}. Please use another name`
    return new AppError(message,400)
}
const handleValidationErrorDB = err => {
    const errors = Object.values(err.errors).map(el=> el.message)
    const message = `Invalid input data. ${errors.join('. ')}`
    return new AppError(message,400)
}



const sendErrorProd = (err,res) => {
    if(err.isOperational){
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
            
        })
    }else{
        console.error('Error', err)
        res.status(500).json({
            status: "error",
            message: "Something went wrong"
        })
    }
    
}

const sendErrorDev = (err,res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    })
}

module.exports = (err, req,res,next) => {
    err.statusCode = err.statusCode || 500
    err.status = err.status || 'error'

    if(process.env.NODE_ENV === 'development'){
        sendErrorDev(err,res)
    }

    else if(process.env.NODE_ENV === 'production'){
        if(err.code === 11000) err = handleDuplicatedFieldDB(err)
        if(err.name === "CastError") err = handleCastErrorDB(err)
        if(err.name === "ValidationError") err = handleValidationErrorDB(err)
        sendErrorProd(err,res)
    }
    
}