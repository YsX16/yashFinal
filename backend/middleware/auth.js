const Errorhandler = require("../utils/errorhandler");
const catchasyncError = require("./catchasyncError");
const jwt = require("jsonwebtoken")
const User = require("../models/userModels");

exports.isAuthenticatedUser = catchasyncError(async(req, res, next) =>{
    const {token} = req.cookies;
   

    if(!token){
        return next(new Errorhandler("please login to access this resource", 401))
    }

    const decodedData = jwt.verify(token,process.env.JWT_SECRET)

    req.user = await User.findById(decodedData.id)
    next()
})
exports.IsVerifiedUser = catchasyncError(async(req, res, next) =>{

    const isverified = req.user.isverified

     if(isverified === false){
        return next(new Errorhandler("You are not a Verified User Please Verify Your Account.", 401))
    }

   
    next()
})


exports.authorizeRoles = (...roles) =>{
    return (req, res, next) => {
        if(!roles.includes(req.user.role)){
          return next( new Errorhandler(
                `Role: ${req.user.role} is not allowed to access this recource`, 403
            )
            )
        }
        next()
    }
}