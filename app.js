const express = require("express");
const helmet = require("helmet");
const morgan = require('morgan')
const rateLimit = require('express-rate-limit')
const mongoSanitize = require('express-mongo-sanitize')
const xss = require('xss-clean')
const hpp = require('hpp')
const compression = require('compression')


const test = require('./routes/test');
const { mongo } = require("mongoose");

const app = express();

app.use(express.static(path.join(__dirname, '/public')));

app.use(helmet())

if(process.env.NODE_ENV === "development"){
    app.use(morgan('dev'))
}

const limiter = rateLimit({
    max:100,
    windowMs:60*60*1000,
    message:'Too many request from this IP, please try again in an hour'
})

app.use('/api',limiter)

app.use(express.json({limit:'10kb'}))

app.use(mongoSanitize())

app.use(xss())

// app.use(hpp({

// }))

app.use(compression())

app.use((req, res, next) => {
    res.requestTime = new Date().toISOString();
  
    next();
  });
  

app.use('/',test)

module.exports = app