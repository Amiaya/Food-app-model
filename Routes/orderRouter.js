const express = require('express')
const orderController = require('../Controller/orderController')
const router = express.Router({mergeParams: true})
const userController = require('../Controller/authController')


router.route('/').post(userController.protect, orderController.createOrder).get(orderController.getAllOrder)

router.route('/:id').get(userController.protect,orderController.getOrder)

router.post('/review', orderController.review)

module.exports = router