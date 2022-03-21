const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    Username: String,
    email: String,
    password: String,
    phoneNo: String,
})

const User = mongoose.model("User", userSchema)
module.exports = User