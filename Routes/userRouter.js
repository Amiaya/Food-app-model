const express = require('express')
const userController = require('../Controller/authController')
const orderRouter = require('./orderRouter')

const router = express.Router()

router.post('/signup' , userController.signup)
router.post('/login' , userController.login)

router.use('/:userId/orders', orderRouter)

module.exports = router