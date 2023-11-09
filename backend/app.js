const cookieParser = require("cookie-parser")
const express = require("express")
const app = express()
const errorMiddleware = require("./middleware/error")
const bodyParser = require("body-parser")
const fileUpload = require("express-fileupload")
const dotenv = require("dotenv")
const path = require("path")


dotenv.config({path:"backend/config/config.env"})

app.use(cookieParser())

app.use(express.json({limit: "10mb", extended: true}))
app.use(express.urlencoded({limit: "10mb", extended: true, parameterLimit: 50000}))
app.use(express.json())
app.use(fileUpload());
// routes import
const product = require("./routes/productRoutes")
const user = require("./routes/userRoutes")
const order = require("./routes/orderRoutes")
const payment = require("./routes/paymentRoutes")


app.use("/api/v1",product)
app.use("/api/v1", user)
app.use("/api/v1", order)
app.use("/api/v1", payment)


 app.use(express.static(path.join(__dirname,"../frontend/build")))

app.get("*",(req, res) => {
    res.sendFile(path.resolve(__dirname,"../frontend/build/index.html"))
})
// middleware for errr

app.use(errorMiddleware)

module.exports = app