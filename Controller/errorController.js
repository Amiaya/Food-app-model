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

module.exports = (err, req,res,next) => {
    err.statusCode = err.statusCode || 500
    err.status = err.status || 'error'

    if(err.code === 11000) err = handleDuplicatedFieldDB(err)
    if(err.name === "CastError") err = handleCastErrorDB(err)
    if(err.name === "ValidationError") err = handleValidationErrorDB(err)

    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    })
}