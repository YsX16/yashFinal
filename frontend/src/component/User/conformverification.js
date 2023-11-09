import React, { useState, useEffect } from "react";
import "./conformverify.css";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, letsVerifyEmail } from "../../actions/userAction";
import { useAlert } from "react-alert";

const Conformverification = ({ history, location, match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { user, isAuthenticated, error } = useSelector((state) => state.user);

  const [is_verified, setisverified] = useState(user.is_verified);

  const verifyemail = async () => {
    try {
      await dispatch(letsVerifyEmail(match.params.token));
      alert.success("Your Email is now verified. You can continue shopping.");
      setTimeout(() => {
        history.push("/");
      }, 2000); // Redirect after 3 seconds
    } catch (error) {
      alert.error(error.message);
    }
  };

  const redirectoo = location.search
    ? location.search.split("=")[1]
    : "/account";

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (is_verified === false) {
      verifyemail(); // Automatically proceed if already verified
    }else if(is_verified === true){
      history.push("/")
      alert.error("Your Verification Is Already Done.")
    }
  }, [dispatch, error, alert, history, is_verified]);

  return (
    <div>
      <div className="container">
        <div className="message-box">
          <h2>Email Verified!</h2>
          <p>Your email address has been successfully verified.</p>
          <p>You can now continue shopping.</p>
        
        </div>
      </div>
    </div>
  );
};

export default Conformverification;

