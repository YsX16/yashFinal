const Order = require("../models/orderModel")
const Product = require ("../models/productModel");
const Errorhandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchasyncError")
const User = require("../models/userModels");
const sendEmail = require("../utils/sendEmail")

// create New Order

exports.newOrder = catchAsyncError(async (req, res, next) => {
    const {
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id,
    })

    res.status(201).json({
        success: true,
        order,
    })

})


// order conform mail
exports.orderConformedMail = catchAsyncError(async(req, res, next) => {
  const user = await User.findOne({ email: req.body.email})
  const username = req.body.username
  const trackorder = "https://www.fashionboi.com/orders"
  if(!user){
      return next(new Errorhandler("User not Found", 404))
  }

  // Get Resetpass Token



  await user.save({validateBeforeSave: false})

const fashionboihelp = `https://fashionboi.com/help`

  const message = `Dear ${username},

  Thank you for choosing fashionboi for your recent order. We truly appreciate your trust in our products and services.
  
  We regret to inform you that we do not have any local partners in your country. As a result, it will take approximately 13 to 15 days for your order to reach you. We understand that this may be a longer waiting period than you might have expected, but we want to assure you that we are committed to delivering your order to you without any additional cost. Your satisfaction is of utmost importance to us, and we are working diligently to make sure your order arrives in perfect condition and in a timely manner.
  
  Please note that for the next 24 Hour after receiving this confirmation, you have the option to cancel your order if you wish to do so. However, once your order is in transit, which will happen after these 24 hour, we won't be able to cancel it.
  
  If you have any questions or require any further information regarding your order, please feel free to contact our customer support team at ${fashionboihelp} . They will be more than happy to assist you with any concerns you may have.
  
  Thank you once again for choosing fashionboi We look forward to serving you and hope you enjoy your purchase when it arrives. `

  try {

      await sendEmail({
              email: user.email,
              subject: ` Order Confirmation and Delivery Information`,
              message, 
      })

      res.status(200).json({
          success: true,
         
      })
      
  } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save({validateBeforeSave: false})

      return next(new Errorhandler(error.message, 500))
  }
})



// get single order
exports.getSingleOrder = catchAsyncError(async (req, res, next) => {

    const order = await Order.findById(req.params.id).populate(
        "user",
        "name email"
      );
    
      if (!order) {
        return next(new Errorhandler("Order not found with this Id", 404));
      }
    
      res.status(200).json({
        success: true,
        order,
      });
    });


// get logged in user orders  
    exports.myOrders = catchAsyncError(async (req, res, next) => {
        const orders = await Order.find({ user: req.user._id });
      
        res.status(200).json({
          success: true,
          orders,
        });
      });


    //   get all order --admin

      exports.getAllOrders = catchAsyncError(async (req, res, next) => {
        const orders = await Order.find()


        let totalAmount=0

        orders.forEach(order=>{
            totalAmount += order.totalPrice
        })
      
        res.status(200).json({
          success: true,
          totalAmount,
          orders,
        });
      });

       //   update order  status --admin

      // update Order Status -- Admin
exports.updateOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new Errorhandler("Order not found with this Id", 404));
  }

  if (order.orderStatus === "Delivered") {
    return next(new Errorhandler("You have already delivered this order", 400));
  }

  if (req.body.status === "Shipped") {
    order.orderItems.forEach(async (o) => {
      await updateStock(o.product, o.quantity);
    });
  }
  order.orderStatus = req.body.status;
order.trakingid = req.body.track;
  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);

  product.Stock -= quantity;

  await product.save({ validateBeforeSave: false });
}



 //   delete order --admin

;

exports.deleteOrders = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHander("Order not found with this Id", 404));
  }

  await order.deleteOne();

  res.status(200).json({
    success: true,
  });
});
