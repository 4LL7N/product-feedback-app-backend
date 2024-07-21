const express = require('express')
const { getAllComment, createComment, getComment, updateComment, deleteComment } = require('../controllers/commentController')

const router = express.Router()

router
    .route('/')
    .get(getAllComment)
    .post(createComment)

router
    .route('/:id')
    .get(getComment)
    .patch(updateComment)
    .delete(deleteComment)