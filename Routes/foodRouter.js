const express = require('express')

const router = express.Router()
const foodController = require('../Controller/foodController')
const userController = require('../Controller/authController')

router.route('/').post(userController.protect,userController.restrictTo('admin'),foodController.createFood).get(foodController.getAllFood)
router.route('/:id').patch(userController.protect,userController.restrictTo('admin'), foodController.updateFood).delete(userController.protect,userController.restrictTo('admin'), foodController.deleteFood)

module.exports = router