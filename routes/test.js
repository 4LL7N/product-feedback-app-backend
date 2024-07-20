const express = require('express')
const {test} = require('../controllers/testControl')


const router = express.Router()

router.get('/',test)

module.exports = router