const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");

exports.login = catchAsync(async (req,res,next) => {

    const user = await User.findOne({name: "Zena Kelley"}).select('-__v')
    
    req.user = user    
    next()
})