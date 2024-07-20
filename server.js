const mongoose = require('mongoose')
const dotenv = require('dotenv')

const app = require('./app')

const port = process.env.PORT || 3000

const server = app.listen(port,()=> {
    console.log(`running on ${port}...`);
})