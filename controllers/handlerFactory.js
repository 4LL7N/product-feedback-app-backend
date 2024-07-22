const Comment = require('../models/commentModel')
const Feedback = require('../models/feedbackModel')
const Reply = require('../models/replyMode')
const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')

exports.getOne = (Model,popOptions) => catchAsync(async(req,res,next)=>{
    let query = await Model.findById(req.params.id)
    if(popOptions)query = query.populate(popOptions)

    const doc = await query

    if(!doc){
        return next(new AppError('no document found with this id ',404))
    }

    res.status(200).json({
        status:'success',
        data:{
            doc
        }
    })
})

exports.getAll = (Model) => catchAsync(async(req,res,next) => {
    
    const doc = await Model.find()
    

    res.status(200).json({
        status:'success',
        result:doc.length,
        data:{
            doc
        }
    })
})


exports.createOne = (Model) => catchAsync(async(req,res,next) => {
    if(Model == Comment || Model == Reply ){
        req.body.user = req.user
        
        if(Model == Comment){
            const feedback = await Feedback.findById(req.body.feedback)
            if(!feedback)return next(new AppError('feedback with this id does not exists',404))
        }
        if(Model == Reply){
            const comment = await Comment.findById(req.body.commentOn)
            if(!comment)return next(new AppError('Comment with this id does not exists',404))
        }
    }


    const doc = await Model.create(req.body)

    res.status(201).json({
        status:'success',
        data:{
            doc
        }
    })
})

exports.deleteOne = Model => catchAsync(async(req,res,next)=>{
    const doc = await Model.findByIdAndDelete(req.params.id)

    if(!doc){
        return next(new AppError(`no document found with that id`, 404))
    }
    res.status(201).json({
        status:'success',
        data:null
    })
})

exports.updateOne = Model => catchAsync(async(req,res,next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true
    })

    if(!doc)return next(new AppError('no document found with that id',404))

    res.status(200).json({
        status:'success',
        data:{
            doc
        }
    })
})