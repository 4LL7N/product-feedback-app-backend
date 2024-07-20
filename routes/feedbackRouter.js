const express = require('express')
const {test} = require('../controllers/feedbackController')


const router = express.Router()

router.get('/',test)

module.exports = router