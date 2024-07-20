const Feedback = require("../models/feedbackModel");
const { getAll, getOne, deleteOne, updateOne, createOne } = require("./handlerFactory");

exports.getAllFeedback = getAll(Feedback)
exports.getFeedback = getOne(Feedback)
exports.deleteFeedback = deleteOne(Feedback)
exports.updateFeedback = updateOne(Feedback)
exports.createFeedback = createOne(Feedback)