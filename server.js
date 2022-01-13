const mongoose = require('mongoose')
const dotenv = require('dotenv')
process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION!')
    console.log(err.name, err.message);
    process.exit(1)
})
dotenv.config({ path: './config.env' })
const app = require("./app")

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
// mongoose.connect(process.env.DATABASE_LOCAL, {
mongoose.connect(DB, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
}).then(() => {
    console.log('db successfull')
})


process.env.NODE_ENV="development"
// console.log(process.env)

const port = process.env.PORT || 8001
const server = app.listen(port, ()=> {
    console.log(`App running on port ${port}`)
})

process.on('unhandledRejection', err => {
    console.log('UNCAUGHT REJECTION!')
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1)
    })
});
