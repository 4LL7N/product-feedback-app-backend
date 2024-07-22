const express = require('express')
const { getUser, createUser, getAllUser } = require('../controllers/userController')

const router = express.Router()

router
    .route('/')
    .get(getAllUser)
    .post(createUser)

module.exports =router