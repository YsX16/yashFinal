import React from 'react'
import "./verify.css"
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, sendVerificationEmail } from "../../actions/userAction";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";


const Verify = ({history}) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const {user,  isAuthenticated } = useSelector((state) => state.user)

    const [timer, setTimer] = useState(60);
    const [isTimerActive, setIsTimerActive] = useState(false);
  
    const [email, setEmail] = useState()
  
    const startTimer = () => {
      setIsTimerActive(true);
    };
  
    useEffect(() => {
      let interval;
  
      if (isTimerActive) {
        interval = setInterval(() => {
          if (timer > 0) {
            setTimer(timer - 1);
          } else {
            setIsTimerActive(false);
            clearInterval(interval);
          }
        }, 1000);
      }
  
      return () => {
        clearInterval(interval);
      };
    }, [timer, isTimerActive]);
  
   

  const verifyemail = (e) => {
    e.preventDefault();
  if (!isTimerActive) {
      startTimer();
      // Add logic here to resend the verification email
    }
 
    setEmail(user.email)
    console.log(user.email)
  

   
      const myForm = new FormData();
  
      myForm.set("email", email);
      
     
      dispatch(sendVerificationEmail(myForm));
    };
 

  return (
    <div>
       <div className="container">
      <div className="verification-box">
        <h2>Verify Your Email</h2>
        <p>An email with a verification link has been sent to your email address. Please click the link to verify your account.</p>
        {isTimerActive ? (
          <p>Resend email in: {timer} seconds</p>
        ) : (
          <button className="verify-button" onClick={verifyemail}>Resend Verification Email</button>
        )}
      </div>
    </div>
    </div>
  )
}

export default Verify
