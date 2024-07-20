const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')

exports.getOne = (Model) => catchAsync(async(req,res,next)=>{
    let doc = await Model.findById(req.params.id)

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




exports.createOne = (Model) => catchAsync(async(req,res,next) => {
    
    const doc = await Model.create(req.body)

    res.status(201).json({
        status:'success',
        data:{
            doc
        }
    })
})