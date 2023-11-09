const Product = require ("../models/productModel");
const Errorhandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchasyncError")
const ApiFeatures = require("../utils/apifeature")
const cloudinary = require("cloudinary")





// create product admin
exports.createProduct = catchAsyncError(async (req, res, next) => {
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }      

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
  req.body.user = req.user.id;
    const product = await Product.create(req.body);


    res.status(201).json({
        success: true,
        product,
    })

})



// Get all product
exports.getAllProducts = catchAsyncError(async(req, res) => {
  const resultPerPage = 20;
  const productsCount = await Product.countDocuments();

  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter();

  if (req.query.tags) {
    // Handle filtering by tags
    apiFeature.query = apiFeature.query.where("tags").in(req.query.tags.split(','));
  }

  let products = await apiFeature.query;
  let filteredProductsCount = products.length;

  apiFeature.pagination(resultPerPage);
  products = await apiFeature.query.clone();

  res.status(200).json({
    success: true,
    products,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  });
});




exports.searchedProducts = catchAsyncError(async(req, res) => {

  const resultPerPage = 20;
const productsCount = await Product.countDocuments();


    const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    
    .filter()
    

    let products = await apiFeature.query;

    let filteredProductsCount = products.length;
    apiFeature.pagination(resultPerPage);


    products = await apiFeature.query.clone();
    res.status(200).json({
        success: true,
        products,
        productsCount,
        resultPerPage,
        filteredProductsCount,
    
    })
  
   })


   
 
// get all peoduct admin

exports.getAdminProducts = catchAsyncError(async(req, res) => {

 const products = await Product.find()
      res.status(200).json({
          success: true,
          products,
          
      
      })
  })



// get product details

exports.getProductDetails = catchAsyncError( async(req, res, next) => {
    const product = await Product.findById(req.params.id)

    if(!product){
        return next(new Errorhandler("product not found", 404))


    }

    res.status(200).json({
        success:true,
        product,
        
    })

})


// queory, next, catchAsyncError, params, uncaughtException, captureStackTrace, constructor, super, this, regex, options




// Update product -- admin

// Update Product -- Admin

exports.updateProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  // Images Start Here
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    // Deleting Images From Cloudinary
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});



// delete product

exports.deleteProduct =  catchAsyncError( async(req, res, next) => {

    const product = await Product.findById(req.params.id)

    if(!product){
        return res.status(500).json({
            success:false,
            message:" product not found"
        })
    }


    // delete
    for (let i = 0; i < product.length; i++) {
     await cloudinary.v2.uploader.destroy(product.images[i].public_id)
      
    }
 
    await product.deleteOne()
res.status(200).json({
    success:true,
    message: "product delete successfully"
})

})


// crearte review and update

exports.createProductReview = catchAsyncError(async(req, res, next) => {

const {rating, comment, productId, userprofile} =  req.body
    const review = {
        user:req.user._id,
        userprofile: userprofile,
        name:req.user.name,
        
        rating: Number(rating),
        comment,
    }

     const product = await Product.findById(productId)
     
     const isReviewed = product.reviews.find(
      (rev) => rev.user.toString() === req.user._id.toString()
    );
  
    if (isReviewed) {
      product.reviews.forEach((rev) => {
        if (rev.user.toString() === req.user._id.toString())
          (rev.rating = rating), (rev.comment = comment);
      });
    } else {
      product.reviews.push(review);
      product.numOfReviews = product.reviews.length;
    }
  
    let avg = 0;
  
    product.reviews.forEach((rev) => {
      avg += rev.rating;
    });
  
    product.ratings = avg / product.reviews.length;
  
    await product.save({ validateBeforeSave: false });
  
    res.status(200).json({
      success: true,
    });
  });


//   get all review of a product
exports.getProductReviews = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.id);
  
    if (!product) {
      return next(new Errorhandler("Product not found", 404));
    }
  
    res.status(200).json({
      success: true,
      reviews: product.reviews,
    });
  });


//   Delete reviews
exports.deleteReview = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);
  
    if (!product) {
      return next(new Errorhandler("Product not found", 404));
    }
  
    const reviews = product.reviews.filter(
      (rev) => rev._id.toString() !== req.query.id.toString()
    );
  
    let avg = 0;
  
    reviews.forEach((rev) => {
      avg += rev.rating;
    });
  
    let ratings = 0;
  
    if (reviews.length === 0) {
      ratings = 0;
    } else {
      ratings = avg / reviews.length;
    }
  
    const numOfReviews = reviews.length;
  
    await Product.findByIdAndUpdate(
      req.query.productId,
      {
        reviews,
        ratings,
        numOfReviews,
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );
  
    res.status(200).json({
      success: true,
    });
  });

