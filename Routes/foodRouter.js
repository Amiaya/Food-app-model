const express = require('express')

const router = express.Router()
const foodController = require('../Controller/foodController')

router.route('/').post(foodController.createFood).get(foodController.getAllFood)

module.exports = router