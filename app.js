const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const orderRouter = require('./Routes/orderRouter')
const userRouter = require('./Routes/userRouter')
const foodRouter = require('./Routes/foodRouter')
const errorController = require('./Controller/errorController')
const AppError = require('./utils/AppError')

const app = express()
dotenv.config()
app.use(express.json())

app.use('/api/v1/order', orderRouter)
app.use('/api/v1/user', userRouter)
app.use('/api/v1/food', foodRouter)

app.all('*', (req,res,next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server`,400))
})
app.use(errorController)

const DB = process.env.DATABASE
mongoose.connect(DB, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true
 }).then(()=> console.log('DB connection successful!'))


const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Application running on port ${port}`)
})