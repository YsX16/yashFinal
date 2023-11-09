import React from 'react'
import logo from '../../../imgs/batman.png'

// import script from './script.js'


import { useSelector } from "react-redux";
import UserOptions from './UserOptions'




const Header = () => {
  const {cartItems} = useSelector((state) => state.cart)

const mediaQuery = window.matchMedia('(min-width: 799px)')

  
  const {isAuthenticated, user} = useSelector((state) => state.user)
  return (

   
    <div>

      

<section id="header">

 
        <a href="/"><img src={logo} alt="I am batman" className="logo"></img> </a>

        <div>
          
            <ul id="navbar" >
            
             
                { window.location.pathname === "/" ? <li><a href="/" className='active'>Home</a></li> : <li><a href="/">Home</a></li>}
                {window.location.pathname === "/Shop" ? <li><a href="/Shop" className='active'>Shop</a></li> : <li><a href="/Shop" >Shop</a></li>}
  
                {window.location.pathname === "/offers" ? <li><a href="/offers" className='active'>Offers</a></li> :  <li><a href="/offers">Offers</a></li> }
                {window.location.pathname === "/AboutUs" ? <li><a href="/AboutUs" className='active'>About Us</a></li> :  <li><a href="/AboutUs">About Us</a></li>}
               
                {isAuthenticated === false ?   <li><a href="/login">Login</a></li> : null}
                {window.location.pathname === "/contact" ? <li><a href="/contact" className='active'>Contact</a></li> : <li><a href="/contact">Contact</a></li> }
                

                {window.location.pathname === "/search" ?   <li> <a href="/search" className='active'><i className="fas fa-search"></i></a></li> :    <li> <a href="/search"><i className="fas fa-search"></i></a></li> }
                <a  className='hiyahsu'href='#'> {isAuthenticated === true ? <UserOptions user={user} />  : null}</a>
             
                {window.location.pathname === "/cart" ? <li id="lg-bag"><a href="/cart" className='active'><i className="fas fa-shopping-bag"></i></a></li>
                :  <li id="lg-bag"><a href="/cart"><i className="fas fa-shopping-bag"></i></a></li>
              }
                
               
                <a  id="close"><i className="fas fa-times"></i></a>
            </ul>
           
        </div>
        <div id="mobile">
            
          {cartItems.length === 0 ?
           <a href="/cart">
           <i className="fas fa-shopping-bag"></i>
           </a> :   <div>
            <div className='cartitemquantity'>
                  <span id='cartquantity'>{cartItems.length}</span>
                  </div>
            <a href="/cart">
              <i className="fas fa-shopping-bag"></i>
            </a>
            </div> }

              

           
            <a href="/search"><i className="fas fa-search"></i></a>
           <i id="bar"  className="fas fa-outdent"></i>
        </div>
        
    </section>
      
  
    
    </div>

  )
}

export default Header
