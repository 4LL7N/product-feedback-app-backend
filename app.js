const express = require("express");
const helmet = require("helmet");
const morgan = require('morgan')
const rateLimit = require('express-rate-limit')
const mongoSanitize = require('express-mongo-sanitize')
const xss = require('xss-clean')
const hpp = require('hpp')
const compression = require('compression')
const { mongo } = require("mongoose");
const path = require('path')

const feedbackRouter = require('./routes/feedbackRouter');
const commentRouter = require('./routes/commentRouter');
const userRouter = require('./routes/userRouter')
const replyRouter = require('./routes/replyRouter')
const {login} = require('./controllers/loginController')
const AppError = require("./utils/appError");
const globalErrorHandler = require('./controllers/errorController')

const app = express();

const secretPath = path.join('/etc/secrets', 'config.env');
console.log(secretPath);
const data = require(secretPath)

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

// app.use('/api',limiter)

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
  
app.use(login)

app.use('/api/v1/users',userRouter)
app.use('/api/v1/feedbacks',feedbackRouter)
app.use('/api/v1/comments',commentRouter)
app.use('/api/v1/replies',replyRouter)

app.all('*', (req, res, next) => {
    next(new AppError(`can not find ${req.originalUrl} on this server `, 404));
});

app.use(globalErrorHandler)

module.exports = app