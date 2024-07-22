const mongoose = require('mongoose')

const repliesSchema = new mongoose.Schema({
    content:{
        type:String,
        require:[true,'replies must have content']
    },
    replyingTo:{
        type:String,
        require:true
    },
    user:{
        type:{
            image:String,
            name:String,
            username:String
        },
        require:[true,'comment must have author']
    },
    commentOn:{
        type:mongoose.Schema.ObjectId,
        ref:'Comment',
        require:[true,'reply must belong to comment']
    }
})

const Reply = mongoose.model('Reply',repliesSchema)

module.exports =Reply