const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")
 

const userSchema  = new mongoose.Schema({

    name:{
        type: String,
        require: [true, "please enter Your name"],
        maxlength:[30, "Name cannot exceed  30 characters"],
        minlength:[4,"Name should have at least 4 characters"]
    },

    email:{
        type: String,
        require: [true,"please enter your name"],
        unique: true,
        validator: [validator.isEmail,"please enter a vaild email"],
        minlength:[9, "enter email please "],
        maxlength: [30, "email is To long bro"]

    },

    password:{
        type: String,
        require: [true, "please enter a passward with 8 characters"],
        minlength:[8,"password should least 8 characters"],
        select: false,
    },

    avatar:{
        
            public_id:{
                type:String,
                required:true,
            },
            url:{
                type:String,
                required:true,
            },
           
    },

    role:{
        type: String,
        default: "user",
    },

    is_verified:{
        type: Boolean,
        default:false,
    },
    
    createdAt: {
        type: Date,
        default: Date.now,
      },

    resetPasswordToken:String,
    resetPasswordExpire: Date,
})


userSchema.pre("save",async function(next){

    if(!this.isModified("password")){
        next();
    }

    this.password = await bcrypt.hash(this.password, 10)
})
     // jwd token
    userSchema.methods.getJWTToken = function () {
        return jwt.sign({id:this._id}, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRE,

    
        })

        
    }

    // compare password
    userSchema.methods.comparePassword = async function(password){
        return await bcrypt.compare(password, this.password)
    }

    // Generating password reset token

    userSchema.methods.getResetPasswordToken = function () {
        const resetToken = crypto.randomBytes(20).toString("hex")


        // Hashing and adding to userSchema

        this.resetPasswordToken = crypto
        .createHash("sha256").update(resetToken).digest("hex")

        this.resetPasswordExpire = Date.now() + 15 * 60 *1000

        return resetToken;
    }


module.exports =  mongoose.model("User",userSchema)