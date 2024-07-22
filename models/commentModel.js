const mongoose = require('mongoose')
const Feedback = require('./feedbackModel')

const commentSchema = new mongoose.Schema({
    content:{
        type:String,
        require:[true,'Comment must have content']
    },
    user:{
        type:{
            image:String,
            name:String,
            username:String
        },
        require:[true,'comment must have author']
    },
    feedback:{
        type:mongoose.Schema.ObjectId,
        ref:'Feedback',
        require:[true,'Comment must belong to feedback']
    }
    // replies:[]
}) 

const Comment = mongoose.model('Comment',commentSchema)

module.exports = Comment