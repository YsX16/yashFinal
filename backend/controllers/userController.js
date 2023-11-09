const Errorhandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchasyncError")
const User = require("../models/userModels");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail")
const crypto = require("crypto")
const cloudinary = require("cloudinary");
const { url } = require("inspector");
const fileUpload = require("express-fileupload");










// regisster a user

exports.registerUser = catchAsyncError(async(req, res, next) => {
   
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
        crop: "scale",
    })
   
    const {name,email,password} = req.body;

    const user = await User.create({
        name,email,password,
        avatar:{
            public_id: myCloud.public_id,
            url: myCloud.secure_url,

        },
     
    })


       
    
      
   
    
   
   sendToken(user, 201, res)
})










// login user
exports.loginUser = catchAsyncError(async(req, res, next)=>{
    const {email, password} = req.body;

    // checking if user has given pass and username

    if(!email || !password) {
        return next(new Errorhandler("please enter email & password", 400))

    }

    const user = await User.findOne({email}).select("+password")

    if(!user) {
        return next(new Errorhandler("invalid Email or Username", 401))
    }

    const isPasswordMatched = await user.comparePassword(password)

    if(!isPasswordMatched){
        return next(new Errorhandler("Invalid Email or password", 401))
    }

  sendToken(user,200,res)
    
})

// logout

exports.logout = catchAsyncError(async(req, res, next) =>{
    res.cookie("token", null,{
        expires: new Date(Date.now()),
        httpOnly: true,
    })

    res.status(200).json({
        success: true,
        message: "You Have Log Out Successfully",

    })
})


exports.sendVerifyEmail = catchAsyncError(async(req, res) => {
    
    const Email = req.body.email

    const user = await User.findOne({ email: Email})

    if(!user){
        return next(new Errorhandler("User not Found", 404))
    }

    // Get Resetpass Token

    const verifytoken = user.getResetPasswordToken()

    await user.save({validateBeforeSave: false})


    const verifytokenlink = `https://fashionboi.com/verify/${verifytoken}`
    
    const message = `Your Email Verification Link is :- \n\n ${verifytokenlink} \n\n If You have not requested this email then, ignore it`

    try {

        await sendEmail({
                email: Email,
                subject: `Fashionboi Email Verification`,
                message, 
        })

        res.status(200).json({
            success: true,
            message: `Email sent to ${Email} Successfully :)`,
        })
        
    } catch (error) {
       

        return next(new Errorhandler(error.message, 500))
        console.log(" backend")
    }
})

// Forgot Password 

exports.forgotPassword = catchAsyncError(async(req, res, next) => {
    const user = await User.findOne({ email: req.body.email})

    if(!user){
        return next(new Errorhandler("User not Found", 404))
    }

    // Get Resetpass Token

    const resetToken = user.getResetPasswordToken()

    await user.save({validateBeforeSave: false})

    const resetPasswordUrl = `https://fashionboi.com/password/reset/${resetToken}`

    const message = `Your Password Reset Token is :- \n\n ${resetPasswordUrl} \n\n If You have not requested this email then, ignore it`

    try {

        await sendEmail({
                email: user.email,
                subject: `Fashionboi Password Recovery`,
                message, 
        })

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} Successfully :)`,
        })
        
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({validateBeforeSave: false})

        return next(new Errorhandler(error.message, 500))
    }
})

// Forgot Password 

exports.EmailVerification = catchAsyncError(async(req, res, next) =>{



    const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex")  


    const user = await User.findOne({
        resetPasswordToken, 
        resetPasswordExpire: {$gt:Date.now()},
    
    })
    const id = user.id
    if(!user){
        return next(new Errorhandler("Verification Link is invalid or has been expired", 400))
    }else{
        const updateInfo = await User.updateOne({_id:id}, {$set:{ is_verified:true }})

        console.log(updateInfo)
    }


 
   

    user.resetPasswordToken = undefined;
user.resetPasswordExpire = undefined;


await user.save()

sendToken(user, 200, res)
})

// reset Password
exports.resetPassword = catchAsyncError(async(req, res, next) => {

    // creating token hash
    const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex")

    const user = await User.findOne({
        resetPasswordToken, 
        resetPasswordExpire: {$gt:Date.now()},
    
    })
    
    if(!user){
        return next(new Errorhandler("Verification Link is invalid or has been expired", 400))
    }



if(req.body.password !== req.body.confirmPassword){
    return next(new Errorhandler("Password does not matched :(", 400))

}
user.password = req.body.password;
user.resetPasswordToken = undefined;
user.resetPasswordExpire = undefined;


await user.save()

sendToken(user, 200, res)
})


// GET user Details

exports.getUserDetails = catchAsyncError(async(req, res, next) => {

    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true, 
        user,
    })
})

// Update user passwrod
exports.updatePassword = catchAsyncError(async(req, res, next) => {

    const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched  = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new Errorhandler("Old password is incorrect", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new Errorhandler("password does not match", 400));
  }

  user.password = req.body.newPassword;

  await user.save();

  sendToken(user, 200, res);
})

// Update User profile
exports.updateProfile = catchAsyncError(async (req, res, next) => {
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
    };
 






    if (req.body.avatar !== "undefined") {
      const user = await User.findById(req.user.id);
  
      const imageId = user.avatar.public_id;
  
      await cloudinary.v2.uploader.destroy(imageId);
  
      const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
        crop: "scale",
      });
  
      newUserData.avatar = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }
    const user = await User.findByIdAndUpdate(req.user.id,newUserData,{
        new: true,
        runValidators:true,
        useFindAndModify:false,
    })

    res.status(200).json({
        success: true,
    })


})

// GET ALL USERS
exports.getAllUsers = catchAsyncError(async(req, res, next) =>{
const users = await User.find()

res.status(200).json({
    success:true,
    users,
})



})


// get single user(admin)

exports.getSingleUser = catchAsyncError(async(req, res, next) => {
const user = await User.findById(req.params.id);

if(!user){
    return next(new Errorhandler(`User does not Exists with id:  ${req.params.id}`))
}

res.status(200).json({
    success:true,
    user,

})


})
// update role --aDMIN 

exports.updateUserRole = catchAsyncError(async(req, res, next) => {

    const newUserData={
        name:req.body.name,
        email:req.body.email,
        role: req.body.role,
    }

  

   await User.findByIdAndUpdate(req.params.id,newUserData,{
        new: true,
        runValidators:true,
        useFindAndModify:false,
    })

    res.status(200).json({
        success: true,
    })


})

// delete user admin 
exports.deleteUser = catchAsyncError(async(req, res, next) => {

    const user = await User.findById(req.params.id)

    if(!user){
        return next(new Errorhandler(`USer not exitst  with id : ${req.params.id}`, 400))
    }

    const imageId = user.avatar.public_id;

    await cloudinary.v2.uploader.destroy(imageId);

    await user.deleteOne()

    res.status(200).json({
        success: true,
        message: "User delete successfully",
    })


})


