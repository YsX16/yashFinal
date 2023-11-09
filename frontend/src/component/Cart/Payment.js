import React, { Fragment, useEffect, useRef, useState } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { Typography } from "@material-ui/core";
import { useAlert } from "react-alert";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import axios from "axios";
import "./payment.css";

import { createOrder, clearErrors } from "../../actions/orderAction";



const Payment = ({ history }) => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const payBtn = useRef(null);
  const dispatch = useDispatch();
  const alert = useAlert();
  const stripe = useStripe();
  const elements = useElements();

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

 
  // const currency = "USD";
  // const style = { layout: "vertical" };
  const [isPayPalLoaded, setIsPayPalLoaded] = useState(false);


  useEffect(() => {
    // Define a flag for the PayPal script loading
    let scriptLoaded = false;

    // Load the PayPal script dynamically
    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.REACT_APP_CLIENT_ID}`;
    script.type = 'text/javascript';
    script.async = true;
    script.onload = () => {
      setIsPayPalLoaded(true);
      scriptLoaded = true;
    };
    document.body.appendChild(script);

    // Cleanup the script tag when the component unmounts
    return () => {
      if (scriptLoaded) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    payBtn.current.disabled = true;

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/v1/payment/process",
        paymentData,
        config
      );
      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });

      if (result.error) {
        payBtn.current.disabled = false;

        alert.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

          dispatch(createOrder(order));

          history.push("/success");
        } else {
          alert.error("There's some issue while processing payment ");
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;

      alert.error(error);
    }
  };
  

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, alert]);

  return (
  <>

    <Fragment>
     
    <MetaData title="Payment" />
    <CheckoutSteps activeStep={2} />
  
    
    <div>
     
      <PayPalScriptProvider options={{ 'client-id': process.env.REACT_APP_CLIENT_ID }}>
        <div id="paypal-button-container">
          {isPayPalLoaded ? (
            <PayPalButtons
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        currency_code: 'USD',
                        value: orderInfo.totalPrice,
                      },
                    },
                  ],
                });
              }}
              onApprove={(data, actions) => {
                return actions.order.capture().then(function (details) {
                  if (details.status === 'COMPLETED') {
                    order.paymentInfo = {
                      id: details.id,
                      status: details.status,
                      // Time: update_time,
                    };

                    dispatch(createOrder(order));

                    history.push('/order/success');
                  }

                  alert.success('Transaction was successful ' + details.payer.name.given_name);
                });
              }}
            />
          ) : (
            // You can display a loading indicator here
            <div>Loading PayPal...</div>
          )}
        </div>
      </PayPalScriptProvider>
    </div>
  </Fragment>
  </>
  );
};

export default Payment;
