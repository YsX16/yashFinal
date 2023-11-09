import React, { Fragment, useState } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import "./ConfirmOrder.css";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";


const ConfirmOrder = ({ history }) => {
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const coupondis = window.localStorage.getItem("coupon")
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price - coupondis ,
    0
  );

  
  const [shippingp, setshippingp] = useState(7);
  const [shippingpa, setshippingpa] = useState(0);



  const shippingCharges = subtotal > 59 ? shippingpa : shippingp;
const shippingType = shippingCharges === 10 ? "Express": "Standerd"


  const totalPrice = subtotal + shippingCharges;

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;



  const expressdelivery = () => {
    if(subtotal >= 59){
      setshippingpa(0)
    }
    setshippingp(12)
    
   }

   const standerddelivery = () => {
    if(subtotal >= 59){
      setshippingpa(0)
    }
    setshippingp(7)
    
   }

  const proceedToPayment = () => {
    if(cartItems.length === 0 ){
      
      history.push("/cart")
      
    
     }else{
      const data = {
        subtotal,
        shippingCharges,
        shippingType,
        totalPrice,
      };
  
      sessionStorage.setItem("orderInfo", JSON.stringify(data));
  
      history.push("/process/payment");
     }

    
    
   
  };

  return (
    <Fragment>
      <MetaData title="Confirm Order"  />
      <CheckoutSteps activeStep={1} />
      <div className="confirmOrderPage"  >
        <div>
          <div className="confirmshippingArea">
            <Typography>Shipping Info</Typography>
            <div className="confirmshippingAreaBox">
              <div >
              
                <p>Name:</p>
                <span>{user.name}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{shippingInfo.phoneNo}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className="orderDetailsCartItems">
            <Typography>Your Cart Items:</Typography>
            <div className="orderDetailsCartItemsContainer">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.product} id="conformed-product">
                    <img src={item.image} alt="Product" />
                    <Link to={`/product/${item.product}`}>
                      {item.name}  <br /> {`Size: ${item.size}`}
                    </Link>{" "}
                    <span id="conforms-span">
                      {item.quantity} X ${item.price} ={" "}
                      <b>${item.price * item.quantity}</b>
                    </span>
                    
                  </div>
                ))}
            </div>
          </div>
          <div id="conformbuttondiv">
            <button id="checkoutbutton" onClick={standerddelivery} >Standerd Shipping</button>
            <button id="checkoutbutton" onClick={expressdelivery}>Express Shipping</button>
          </div>
        </div>
        {/*  */}
        <div>
          <div className="orderSummary">
            <Typography>Order Summery</Typography>
            <div>
              <div>
                <p>Subtotal:</p>
                <span>${subtotal}</span>
              </div>

              <div>
                <p id="suprise">Note:</p>
                <p>{subtotal >= 59 ? "Free Delivery for Orders above $59  :)" : (subtotal >= 79 ? "Free Express Delivery for Order Above $79" : "NO FREE DELIVERY FOR ORDERS BELOW $59" )}</p> 
              </div>
              <div>
                <p>Shipping Charges:</p>
                <span>${shippingCharges}</span>
              </div>
              
            </div>

            <div className="orderSummaryTotal">
              <p>
                <b>Total:</b>
              </p>
              <span>${totalPrice}</span>
            </div>

            <button onClick={proceedToPayment}>Proceed To Payment</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;
