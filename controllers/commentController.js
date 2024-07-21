const Comment = require("../models/commentModel");
const { getAll, getOne, deleteOne, updateOne, createOne } = require("./handlerFactory");

exports.getAllComment = getAll(Comment)
exports.getComment = getOne(Comment)
exports.deleteComment = deleteOne(Comment)
exports.updateComment = updateOne(Comment)
exports.createComment = createOne(Comment)