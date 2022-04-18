const express = require('express')
const orderController = require('../Controller/orderController')
const router = express.Router({mergeParams: true})


router.route('/').post(orderController.createOrder).get(orderController.getAllOrder)

router.route('/:id').get(orderController.getOrder)

router.post('/review', orderController.review)

module.exports = router