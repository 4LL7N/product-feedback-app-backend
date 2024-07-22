const User = require("../models/userModel")
const { getAll, getOne, createOne, deleteOne, updateOne } = require("./handlerFactory")


exports.getAllUser = getAll(User)
exports.getUser = getOne(User)
exports.deleteUser = deleteOne(User)
exports.updateUser = updateOne(User)
exports.createUser = createOne(User)