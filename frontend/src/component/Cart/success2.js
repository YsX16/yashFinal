import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, sendVerificationEmail } from "../../actions/userAction";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import { Redirect } from "react-router-dom"; // Import Redirect from react-router-dom
import './sendverification.css';

const EmailVerificationSender = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, message, loading } = useSelector((state) => state.orderConformedMail);
  const { user } = useSelector((state) => state.user);
  const [email, setEmail] = useState(user.email);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const orderConformedMailSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("email", email);

    dispatch(sendVerificationEmail(myForm));

    setIsButtonDisabled(true);

    setTimeout(() => {
      setIsButtonDisabled(false);
    }, 60000);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (message) {
      alert.success(message);
    }
  }, [dispatch, error, alert, message]);

  // Redirect the user to the home page if they are verified
  if (user.is_verified) {
    return <Redirect to="/" />;
  }

  return (
    <div className="email-verification-container">
      <MetaData title="Send Verification Email" />
      <div className="email-verification-box">
        <h1 className="email-verification-title">Send Verification Email</h1>
        <form onSubmit={orderConformedMailSubmit}>
          <input
            type="email"
            placeholder="Your Email"
            required
            name="email"
            value={email}
            disabled
          />
          <p className="email-verification-text">
            Please click the button to send a verification email.
          </p>
          <button
            type="submit"
            className={`email-verification-button ${isButtonDisabled ? 'disabled' : ''}`}
            disabled={isButtonDisabled}
          >
            {isButtonDisabled ? `Resend in ${Math.ceil(60000 / 1000)} sec` : 'Send Verification Email'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmailVerificationSender;
