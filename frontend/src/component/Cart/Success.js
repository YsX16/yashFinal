import React, { Fragment, useState, useEffect } from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import "./orderSuccess.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import Loader from "../layout/loading/loader";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, orderConformedMail } from "../../actions/orderAction";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import MailOutlineIcon from "@material-ui/icons/MailOutline";

const OrderSuccess = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, message, loading } = useSelector(
    (state) => state.orderConformedMail
  );
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const [email, setEmail] = useState(user.email);
  const [username, setUsername] = useState(user.name);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (message) {
      alert.success(message);
    }

    // Send the email when the component mounts
    const myForm = new FormData();
    myForm.set("email", email);
    myForm.set("username", username);
    dispatch(orderConformedMail(myForm));
  }, [dispatch, error, alert, message, email, username]);

  const clearcart = () => {
    localStorage.removeItem("cartItems");
    localStorage.removeItem("shippingInfo");
    localStorage.removeItem("coupon");
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Conform Order" />
          <div className="forgotPasswordContainer">
            <div className="forgotPasswordBox">
              <form onSubmit={(e) => e.preventDefault()}>
                <div hidden="hidden">
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onLoad={(e) => setEmail(user.email)}
                  />
                </div>
                <div className="orderSuccess" onLoad={clearcart()}>
                  <CheckCircleIcon />
                  <h3 className="successorder">Your order is conformed</h3>
                </div>
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default OrderSuccess;
