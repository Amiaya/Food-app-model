const mongoose = require('mongoose')
const bycrpt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A user must have a name']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'A user must have an email']

    },
    password: {
        type: String,
        required: [true, 'A user must have a password'],
        minlength: 8,
        select: false
    },
    order:[
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Order'
        }
    ],
    phoneNo: {
        type: String,
        minlength: 10,
        maxlength: 10,
    }
})

userSchema.virtual('orders',{
    ref:"Order",
    foreignField:"user",
    localField:"_id"
})

userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) return next()

    this.password = await bycrpt.hash(this.password,12)
    next()
    
})

userSchema.methods.correctPassword =  async function(canidatePassword, userPassword){
    return await bycrpt.compare(canidatePassword,userPassword)
}
const User = mongoose.model("User", userSchema)
module.exports = User