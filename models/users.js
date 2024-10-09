const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    user_type:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('users', usersSchema)