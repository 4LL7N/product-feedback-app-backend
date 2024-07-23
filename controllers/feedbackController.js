const Feedback = require("../models/feedbackModel");
const { getAll, getOne, deleteOne, updateOne, createOne } = require("./handlerFactory");

exports.getAllFeedback = getAll(Feedback,{path:'comments'})
exports.getFeedback = getOne(Feedback,{path:'comments'})
exports.deleteFeedback = deleteOne(Feedback)
exports.updateFeedback = updateOne(Feedback)
exports.createFeedback = createOne(Feedback)