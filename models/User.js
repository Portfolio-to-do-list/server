const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true,
        required: [true, 'Please Input Your Email']
    },
    password: {
        type: String,
        minlength: [6, 'Password Sandi Anda Kurang Dari 6']
    }
})

userSchema.post('save',function(err, doc, next){
    if(err.name === 'MongoError' && err.code === 11000){
        next({message: 'Email already exist'})
    }else{
        next(err.errors.password)
    }
})


const User = mongoose.model('User', userSchema);

module.exports = User