import React, { Fragment, useEffect } from "react";
import "./orderDetails.css";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { Link } from "react-router-dom";
import {
  getOrderDetails,
  clearErrors,
  updateOrder,
} from "../../actions/orderAction";
import { Button, Typography } from "@material-ui/core";

import Loader from "../layout/loading/loader";
import { useAlert } from "react-alert";
import { useState } from "react";
import Checkoutstep1 from "../Cart/checkoutstep1";

const OrderDetails = ({ match }) => {
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { error: updateError, isUpdated } = useSelector((state) => state.order);

  const dispatch = useDispatch();
  const alert = useAlert();
  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("status", statuss);

    dispatch(updateOrder(match.params.id, myForm));
    alert.success("Your order is canceled. Refund will be issued within 2 days. For any questions, contact us")
    window.location.reload();
  };

  const [statuss, setStatuss] = useState("Cancelled");
  const [cancelord, setcancelord] =  useState("")
  

  const [isButtonDisabled, setButtonDisabled] = useState(true);



  useEffect(() => {
    if(order && order.orderStatus === "Shipping lable generated"){
      setcancelord(true)
    }else if(order && order.orderStatus  === "Cancelled"){
      setcancelord(true)
    }

    if (order && order.createdAt) {
      const orderDate = new Date(order.createdAt);
      const currentDate = new Date();

      const timeDifference = currentDate - orderDate;
      const daysElapsed = timeDifference / (1000 * 60 * 60 * 24);

      if (daysElapsed < 1) {
        setButtonDisabled(false);
      }
    }
  }, [order]);
  



  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getOrderDetails(match.params.id));
  }, [dispatch, alert, error, match.params.id]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Order Details" />
       <div id="progressbarorder">
       {order.orderStatus && order.orderStatus === "Processing" ? (
            <Checkoutstep1 activeStep={0} />
          ) : null}
          {order.orderStatus && order.orderStatus === "Shipping lable generated" ? (
            <Checkoutstep1 activeStep={1} />
          ) : null}
          {order.orderStatus && order.orderStatus === "Your order is now in the hands of our logistics team for delivery" ? (
            <Checkoutstep1 activeStep={2} />
          ) : null}
          {order.orderStatus && order.orderStatus === "Shipped" ? (
            <Checkoutstep1 activeStep={3} />
          ) : null}
            {order.orderStatus && order.orderStatus === "The shipment is in transit to your location" ? (
            <Checkoutstep1 activeStep={4} />
          ) : null}
          {order.orderStatus && order.orderStatus === "Order Is out For Delivery" ? (
            <Checkoutstep1 activeStep={5} />
          ) : null}
             {order.orderStatus && order.orderStatus === "Your order has been successfully delivered. Thank you for shopping with us!" ? (
            <Checkoutstep1 activeStep={6} />
          ) : null}
       </div>
          <div className="orderDetailsPage">
            <div className="orderDetailsContainer">
              <Typography component="h1">
                Order # <br />
                {order && order._id}
              </Typography>
              <Typography>Shipping Info</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p>Name</p>
                  <p> : {order.user && order.user.name}</p>
                </div>
                <div>
                  <p>Phone</p>
                  <p>: {order.shippingInfo && order.shippingInfo.phoneNo}</p>
                </div>
                <div>
                  <p>Traking-ID</p>
                  <p>: {order.trakingid === null ? "Tracking ID not generated; product not yet dispatched." : order.trakingid }</p>
                </div>
                
                <div>
                  <p>Address</p>
                  <p>
                    {" "}
                    :
                    {order.shippingInfo &&
                      `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                  </p>
                </div>
              </div>
              <Typography>Payment</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order.paymentInfo &&
                      order.paymentInfo.status === "succeeded"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order.paymentInfo &&
                    order.paymentInfo.status === "succeeded"
                      ? "PAID"
                      : order.paymentInfo &&
                        order.paymentInfo.status === "COMPLETED"
                      ? "PAID"
                      : "UNPAID"}
                  </p>
                </div>
                <div>
                  <br></br> <p>Created At</p>
                  <p>: {String(order.createdAt).substr(0, 10)}</p>
                </div>
                <div>
                  <p>Total Amount:</p>
                  <p id="speicalss">
                    {" "}
                    $ {order.totalPrice && order.totalPrice}
                  </p>
                </div>

                <div>
                  <p>Shipping price</p>
                  <p id="speicalss">
                    {" "}
                    $ {order.shippingPrice && order.shippingPrice}
                  </p>
                </div>
              </div>

              <Typography>Order Status</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order.orderStatus && order.orderStatus === "Delivered"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order.orderStatus && order.orderStatus}
                  </p>
                </div>
              </div>
            </div>

            <div className="orderDetailsCartItems">
              <Typography>Order Items:</Typography>
              <div className="borderofcartitems">
                <div className="orderDetailsCartItemsContainer">
                  {order.orderItems &&
                    order.orderItems.map((item) => (
                      <div key={item.product} id="cartitemsimg">
                        <img src={item.image} alt="Product" />
                        <div>
                          <Link to={`/product/${item.product}`}>
                            {item.name} <br />
                            {`Size: ${item.size}`}
                          </Link>{" "}
                        </div>
                        <div id="totalprice">
                          {item.quantity} X ${item.price} ={" "}
                          <b>${item.price * item.quantity}</b>
                        </div>
                        <p id="spanborderbottom"></p>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>

          <div class="box">
            {cancelord === true ? null : (
              <a class="button" href="#popup1">
                Cancel Order
              </a>
            )}
          </div>

          <div id="popup1" class="overlay">
            <div class="popup">
              <a class="close" href="#">
                &times;
              </a>
              <div class="content">
                <p>Are You Sure You Want To Cancel Your Order?</p>
                {order.orderStatus === "Cancelled" ? null : (
                  <button className="button" onClick={updateOrderSubmitHandler} disabled={isButtonDisabled}>
                    Cancel Order
                  </button>
                )}
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default OrderDetails;
