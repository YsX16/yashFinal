const app = require("./app")
const dotenv = require("dotenv")
const connectDatabase = require("./config/database")
const cloudinary = require("cloudinary")
// Handling uncaought Excetion
process.on("uncaughtException", (err) => {
    console.log(`Error:  ${err.message}`)
    console.log(`Shutting down the server due to Uncaught Exception`)
    process.exit(1)
})



// config
dotenv.config({path:"backend/config/config.env"})
// to arrange something or put its parts together in a particular form or arrangement is called as config


// connecting to database
connectDatabase()

cloudinary.config({
cloud_name: process.env.CLOUDINARY_NAME,
api_key: process.env.CLOUDINARY_API_KEY,
api_secret: process.env.CLOUDINARY_API_SECRET


})


const server = app.listen(process.env.PORT,()=> {
    console.log(`port is started at http://localhost:${process.env.PORT}`)
})

// unhandled promise rejection
process.on("unhandledRejection", err =>{
    console.log(`Error ${err.message}`)
    console.log(`Shutting down the server due to Unhandled Promise Rejection`)

    server.close(() => {
        process.exit(1)
    })


})