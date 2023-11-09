import React from 'react'
import img from '../../../img/pay/pay.png'
import logo from '../../../imgs/batman.png'
import paypalimg from "../../../img/paypal.png";
import { useAlert } from 'react-alert'


const Footer = () => {
    const alert = useAlert();

    const hellothere = () => {
        alert.success(" Hidden Coupon Code DOLLOR2DISCOUNTFORU  ")
    }
  return (
    <>
    <section id="newsletter" className="section-p1  section-m1">
    <div className="newstext">
        <h4>Sign Up For Newsletters</h4>
        <p>Get E-mail Updates About latest shop and <span>offers</span></p>
    </div>

    <div className="form">
        <input type="text" placeholder="Your email address"></input>
        <button className="normal" onClick={hellothere}>Sign Up</button>
    </div>
</section>
     <footer className="section-p1">
        <div className="col">
            <img className="logo" src={logo} alt=""></img>
            <h4>Contact</h4>
            <p><strong>Email:</strong> fashionboi.com@gmail.com</p>
            <a href="https://www.instagram.com/_fashionboi.com_/"><p><strong>Instagram:</strong> _fashionboi.com_</p></a>
            <div className="follow">
                <h4>Follow Us</h4>
                <div className="icon">
                    <i className="fab fa-facebook-f"></i>
                    <i className="fab fa-twitter"></i>
                    <i className="fab fa-instagram"></i>
                    <i className="fab fa-pinterest"></i>
                    <i className="fab fa-youtube"></i>
                </div>

            </div>
       
        </div>


        <div className="col">
            <h4 className='fotterabt'>About</h4>
            <a href="/orders">Delivery Information</a>
            <a href="/Privicy-Policy">Privacy Policy</a>
            <a href="/Terms&service">Terms & Service</a>
            <a href="/Refund&Return">Refund & No Return Policy</a>
            <a href="/Cancellation">Cancellation Policy</a>
            <a href="/contact">Contact</a>

        </div>

        <div className="col">
            <h4 className='fotterabt'>My account</h4>
            <a href="/login">Sign In</a>
            <a href="/cart">View Cart</a>
            <a href="/orders">Track My Order</a>
            <a href="/contact">Help!</a>

        </div>

        <div className="col install">
           
           
            <p id='RunoutofName'>Secure Payment Gateway</p>
            <img src={img} alt="" className='Payment_Gateways'></img>
            <img src={paypalimg} alt="" className='Payment_Gateways1'></img>
        </div>

            <div className="copyright">
                <p>© 2023 fashionboi Ltd. All rights reserved.</p>

            </div>
    </footer>
    </>
  )
}

export default Footer
