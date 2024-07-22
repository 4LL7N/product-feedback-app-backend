const Reply = require("../models/replyMode");
const { getAll, getOne, deleteOne, updateOne, createOne } = require("./handlerFactory");

exports.getAllReply = getAll(Reply)
exports.getReply = getOne(Reply)
exports.deleteReply = deleteOne(Reply)
exports.updateReply = updateOne(Reply)
exports.createReply = createOne(Reply)