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
},
{
    toJSON:{
        virtuals:true
    },
    toObject:{
        virtuals:true
    }
}) 

commentSchema.virtual('replies',{
    ref:'Reply',
    foreignField:'commentOn',
    localField:'_id'
})

commentSchema.pre(/^find/, function(next){
    this.populate({
        path:'replies',
        select:'-__v'
    })
    next()
})

const Comment = mongoose.model('Comment',commentSchema)


module.exports = Comment