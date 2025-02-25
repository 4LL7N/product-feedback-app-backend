const mongoose = require('mongoose')
const dotenv = require('dotenv')


process.on('uncaughtException', err => {
    console.log('uncaught exception shuting down');
    console.log(err.name,err.message);
    process.exit(1)
})

dotenv.config({path:'./config.env'})

const app = require('./app')

const DB = process.env.DATABASE.replace(
    '<password>',
    process.env.DATABASE_PASSWORD
)

mongoose
    .connect(DB)
    .then(() => {console.log('db connection success');})

const port = process.env.PORT || 3000

const server = app.listen(port,()=> {
    console.log(`running on ${port}...`);
})

process.on('unhandledRejection', err =>{
    console.log('unhandled rejection shuting down');
    console.log(err.name,err.message);
    
    server.close(() => {
        process.exit(1)
    })
})

process.on('SIGTERM', () =>{
    console.log('SIGTERM RECEIVED. Shutting down gracefully');
    
    server.close(() => {
        console.log('Process terminated!');
    })
})
