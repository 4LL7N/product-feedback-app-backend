const AppError = require("../utils/appError")

const handleCastErrorDB = err => {
    const message = `Invalid ${err.path}: ${err.value}. `
    return new AppError(message,400)
}

const handleDuplicateFieldsDB = err => {
    const value = Object.values(err.keyValue)[0]
    const message = `Duplicate field value: ${value} Please use another value`

    return new AppError(message,400)
}