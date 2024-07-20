exports.test = (rqe,res,next) => {

    res.status(200).json({
        status:"success",
        message:'test successful'
    })
}