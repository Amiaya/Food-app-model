const express = require('express')
const orderController = require('../Controller/orderController')
const router = express.Router({mergeParams: true})
const userController = require('../Controller/authController')
const order = require('../models/order')


router.route('/').post(userController.protect,userController.restrictTo('user'), orderController.createOrder).get(userController.protect,orderController.getAllOrder)

router.route('/single/:id').get(userController.protect,orderController.getOrder)

router.route('/AllOrders').get(userController.protect, userController.restrictTo('admin'), orderController.Orders)

router.post('/review', orderController.review)

router.route('/AllUserOrders').get(userController.protect,orderController.GetUserStats)

router.route('/topOrders/:food').get(userController.protect,orderController.SearchFood)



module.exports = router