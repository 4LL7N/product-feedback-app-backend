const express = require('express')
const { getAllReply, createReply, getReply, updateReply, deleteReply } = require('../controllers/replyController')

const router = express.Router()

router
    .route('/')
    .get(getAllReply)
    .post(createReply)

router
    .route('/:id')
    .get(getReply)
    .patch(updateReply)
    .delete(deleteReply)

module.exports = router