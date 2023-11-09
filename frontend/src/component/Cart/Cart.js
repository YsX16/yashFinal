import React from 'react'
import { useState } from 'react'
import CartItemCard from "./CartItemCard.js"
import { useSelector, useDispatch } from 'react-redux'
import { addItemsToCart, removeItemsFromCart } from "../../actions/cartAction"
import astro from "../../img/cart.png"
import { useAlert } from 'react-alert'
import "../../App.css"



const Cart = ({history}) => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const {cartItems} = useSelector((state) => state.cart)
  

    const [coupon, setcoupon] = useState(0)
    const [validcoupone, setvalidcoupone] = useState("")
  const finalprice = `$ ${cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,0
)}`



    const deletecartitem = (id) => {
        dispatch(removeItemsFromCart(id))
      }


    



      const applycoupone = () => {
        
        


      if(validcoupone === "Thanksforshopping3"){
        setcoupon(3)
        alert.success("Nice, You got 3 doller discount")
      }else if(validcoupone === "DOLLOR2DISCOUNTFORU"){
        setcoupon(2)
        alert.success("Nice, You got 2 doller discount")
        
        
      }else if(validcoupone === "hjk3guih34c-fashionboi-15oFf"){
       if(cartItems.length === 3){
        setcoupon(15)
       }else{
        alert.error("you have to purches at least 3 product to apply this coupone")
       }
        
        
      }else if(validcoupone === "happyfbcustomer4"){
        setcoupon(4)
        alert.success("Nice, You got 4 doller discount")
        
        
      }else if(validcoupone === "superrrfbdiscountfor8"){
        setcoupon(8)
        alert.success("Nice, You got 8 doller discount")
        
      }else if(validcoupone === "fb89ys9dollers"){
        setcoupon(9)
        alert.success("Nice, You got 9 doller discount")
        
      }else if(validcoupone === "jklaifbyss6ss44"){
        setcoupon(6)
        alert.success("Nice, You got 6 doller discount")
        
      }
        
        
        
        else{
        alert.error("wrong coupone")
      }
        
      }

      const finalp =  cartItems.reduce(
        (acc, item) => acc + item.quantity * item.price,0
)

const subtotalprice = finalp > 59 ? 0 : 7



const checkoutHandler = () => {
  if(coupon !== 0){
    window.localStorage.setItem('coupon', coupon)
  }
   
    history.push("/login?redirect=shipping")
}


  return (
   <>
   {cartItems.length === 0 ? 
   <div>
        <section id="page-header" className="about-header" >

        <h2>#Empty</h2>
        
        <p>your cart is Empty</p>
       
        </section>
         <div id='cartdiv'>
            
         <h2 id='noitemfound'>No Item found</h2>
         <img src= {astro} id="cartshite" alt="" />


        <a href="/Shop"> <button className='normalone'>View Product</button> </a>
        </div>
     </div>

        
         
      
   
   :  <>
      <section id="page-header" className="about-header">

<h2>#Thank You</h2>

<p>Thanks For Choosing Us</p>

</section>

<section id="cart" className="section-p1">
        <table width="100%">
            <thead>
                <tr>
                    <td >Remove</td>
                    <td>Image</td>
                    <td>Product</td>
                    <td>Price</td>
                    <td>Size</td>
                    <td>Quantity</td>
                    <td>Subtotal</td>

                </tr>
            </thead>
           {cartItems && cartItems.map((item) => (
             <CartItemCard item={item} deletecartitem={deletecartitem} key={item.product} />
           ))}
            </table>
            
</section>

           
        

<section id="cart-add"  className="section-p1">
<div id="coupon">
    <h3>Apply Coupon</h3>
    <div>
        <input type="text" value={validcoupone} placeholder="Enter your coupon code"  onChange={(e) => setvalidcoupone(e.target.value)} />
        <button className="normal" onClick={applycoupone}>Apply</button>
        
    </div>
    </div>
    <div id="subtotal">
       
        <h2>Cart Totals</h2>
        <table>
            <tr>
                <td>Cart Subtotal</td>
                <td>{`$ ${cartItems.reduce(
                    (acc, item) => acc + item.quantity * item.price,0
           )}`}</td>

            </tr>
            <tr>
                <td>Shipping</td>
                <td>{finalp > 59 ? "Free" : "$7"}</td>
                
            </tr>
           {coupon !== 0 ?  <tr>
                <td>Coupone</td>
                <td>${coupon}</td>
                
            </tr>: <span></span>}
            <tr>
                <td> <strong>Total</strong> </td>
                <td><b>{`$ ${cartItems.reduce(
                    (acc, item) => acc + item.quantity * item.price,0
           )+ subtotalprice - coupon}`}</b></td>
                
            </tr>
        </table>

        <button className="normal" onClick={checkoutHandler}>Proceed to Checkout</button>

    </div>
    
</section>
             
             
          


      
    </>}
   </>
  )
}

export default Cart
