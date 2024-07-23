const mongoose = require('mongoose')

const feedbackSchema = new mongoose.Schema({
    title:{
        type:String,
        require:[true,'feedback must have title']
    },
    category:{
        type:[String],
        enum:{
            values:['UX','UI','enhancement','bug','feature'],
            message:'Difficulty can be only: UX,UI,Enhancement,Bug,Feature'
        },
        require:[true,'feedback must have at least one category']
    },
    upvotes:{
        type:Number,
        default:0
    },
    status:{
        type:String,
        default:'suggestion',
        enum:{
            values:['suggestion','planned','in-progress','live'],
            message:'status is either: suggestion,planned,in-progress,live'
        }
    },
    description:{
        type:String,
        require:[true,'feedback must have description']
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

feedbackSchema.virtual('comments',{
    ref:'Comment',
    foreignField:'feedback',
    localField:'_id'
})


const Feedback = mongoose.model('Feedback',feedbackSchema)

module.exports = Feedback