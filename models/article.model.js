const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var blogSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    body: {
        type: String,
        max: 255
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    likes :[
        {
        type: Schema.Types.ObjectId,
        ref: 'User'
        }
    ],
    comments: [
        {
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        body: {
            type: String,
            max: 255
        },
        createAt:{
            type: Date,
            default: Date.now()
        }
        }
    ],
    createAt :{
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Article', blogSchema);