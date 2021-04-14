const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new Schema({
    username:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        require: true
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    dob: {
        type: Date,
        default: Date.now()
    },
    address: {
        type: String
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    refreshToken: [
        {type: String}
    ]
})

module.exports = mongoose.model('User', userSchema);