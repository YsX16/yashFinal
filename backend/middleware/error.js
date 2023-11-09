const Errorhandler = require("../utils/errorhandler")

module.exports = (err, req, res, next) =>{
    err.statusCode = err.statusCode || 500
    err.message = err.message || "internal server error";

    // wrong mongodb id error
    if(err.name === "CastError"){
        const message = `Resource not found. Invalid: ${err.path}`
        err = new Errorhandler(message, 400)
    }

    // Mongoose Duplicate key error

    if(err.code === 11000){
        const message = `This Email ${Object.keys(err.keyValue)} already exists. Try to Login`
        err = new Errorhandler(message, 400)
    }

    // wrong JWT Token error
    if(err.code === "JsonWebTokenError"){
        const message = `Json web Token is invalid, try again`
        err = new Errorhandler(message, 400)
    }

    if(err.code === "TokenExpiredError"){
        const message = `Json web Token expired, try again`
        err = new Errorhandler(message, 400)
    }


    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    })
} 