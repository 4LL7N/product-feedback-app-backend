const express = require('express')
const {getAllFeedback, createFeedback, getFeedback, updateFeedback, deleteFeedback} = require('../controllers/feedbackController')


const router = express.Router()

router
    .route('/')
    .get(getAllFeedback)
    .post(createFeedback)

router
    .route('/:id')
    .get(getFeedback)
    .patch(updateFeedback)
    .delete(deleteFeedback)

module.exports = router