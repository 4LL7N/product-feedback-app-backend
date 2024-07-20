const express = require("express");
const helmet = require("helmet");
const morgan = require('morgan')
const rateLimit = require('express-rate-limit')
const test = require('./routes/test')

const app = express();

app.use('/',test)

module.exports = app