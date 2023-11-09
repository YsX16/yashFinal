const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: { 
    type: String,
    required: [true, "Please Enter product Name"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please Enter product Description"],
  },
  descriptionone: {
    type: String,
    
  },
  descriptiontwo: {
    type: String,
   
  },

  desimgone:{
    type:String,
  },
  desimgtwo:{
    type:String,
  },
  desimgthree:{
    type:String,
  },
  desimgfour:{
    type:String,
  },
  price: {
    type: Number,
    required: [true, "Please Enter product Price"],
    maxLength: [8, "Price cannot exceed 8 characters"],
  },

  tags:{
    type: String
  },
  discount:{
    type: String,
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Please Enter Product Category"],
  },

  Stock: {
    type: Number,
    required: [true, "Please Enter product Stock"],
    maxLength: [4, "Stock cannot exceed 4 characters"],
    default: 1,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },

  sections:{
    type: String
  },
  isavaration: {
type: Boolean,
  },

  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },

      userprofile: {
        type: String,
        required:true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],

  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },

  variationoneurl:{ type: String},
  variationoneImg:{ type: String},

  variationtwourl:{ type: String},
  variationtwoImg:{ type: String},

  variationthreeurl:{ type: String},
  variationthreeImg:{ type: String},

  variationfoururl:{ type: String},
  variationfourImg:{ type: String},

  variationfiveurl:{ type: String},
  variationfiveImg:{ type: String},

  variationsixurl:{ type: String},
  variationsixImg:{ type: String},

  variationsevenurl:{ type: String},
  variationsevenImg:{ type: String},

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
