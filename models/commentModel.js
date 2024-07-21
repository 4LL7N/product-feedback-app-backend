const mongoose = require('mongoose')

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
    // replies:[]
}) 

const Comment = mongoose.model('Comment',commentSchema)

module.exports = Comment