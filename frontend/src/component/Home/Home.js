import React, { useEffect } from 'react'


import Product from "./Product.js";
import NewArrival from "./NewArrival"
import MetaData from '../layout/MetaData';
import {clearErrors, getProduct} from "../../actions/ProductActions";
import { useSelector,useDispatch } from 'react-redux';
import Loader from '../layout/loading/loader';
import { useAlert } from 'react-alert';



const Home = () => {



  const alert = useAlert();

  
const dispatch = useDispatch()
 const { loading, error, products} = useSelector(
  (state) => state.products
  );


  const itsafunction = () => {
    alert.error("Its not available right now Please try again later ")
  }




  


useEffect(() =>{

  if(error){
    alert.error(error)
    dispatch(clearErrors())
  }
  dispatch(getProduct())
}, [dispatch, error, alert, ])
  return (
   <>
    {loading ? (<Loader />) :  <>

<MetaData title="FashionBoi" />
  <section id="hero">
    <h4>fashionboi</h4>
    <h2 id='hero-heading' >Super value deals</h2 >
    <h1> Premium Quality Products With Awasome Designes
    </h1>
    <h4>Save more with coupons</h4>
    <a href="#falana" id='hero-button' >
      <button>
        <h3 id='mainh3'>Shop Now!</h3>
      </button>
    </a>
  </section>

  <section id="product1" className="section-p1">
    <h2>Featured product</h2>
    <p >Spring Collection New Modern Design</p>
    <p id='homeFeature'></p>
  </section>



{/* start of product shit ------------------------------------------------------------------------------ */}

  <div className='productCard' >
    <section id="product1" className="section-p1">

      <div className="pro-container" >
        
       
    

           
{products && products.map((product, curry) => 
          <Product key={curry} product={product}   />
           )}


      </div>
      <a href="/Shop" id='someone1'> <button className="normal69">Show More</button></a>
    </section>


    {/* Banner banner banner banner banner banner banner ------------------------------------- */}

    <section id="banner" className="section-m1">
   
    <h2>Up to <span>50% off</span> - All Hoodie & Jackets</h2>
   <a href="/offers"> <button className="normal">Explore More</button></a>
  
</section>



    {/* Banner banner banner banner banner banner banner ------------------------------------- */}








    {/* Product section 2 ___________________________________________________________________________________ */}

<section id="product1" className="section-p1">
    <h2>New Arrivals</h2>
    <p>Newly Designed Product Are Here Now</p>
    <p id='homeFeature'></p>
  <section id='falana'>
        
    
   
     
    <div className="pro-container" >
        


       
   
    { products.map((product, curry) => 
          <NewArrival key={curry} product={product}   />
         
           )}



     

      </div>
      </section>
</section>

<section id="product1" className="section-p1">
    <h2 id='mystery'>This Month Offers</h2>
    <p >Use Coupones to Save More!</p>
    <p id='homeFeature'></p>
  </section>
{/* Product section 2 ___________________________________________________________________________________ */}
<section id="sm-banner" className="section-p1">
    <div className="banner-box">
        <h4>Crazy deals</h4>
        <h2>Buy 3 get 1 free</h2>
        <span>The best Classic Cloths is on sale on fashionboi</span>
        <a href="/offers"><button className="white">Learn more</button></a>
    </div>

    <div className="banner-box banner-box2">
        <h4>Anime</h4>
        <h2>Anime Inspired Cloths</h2>
        <span>Best Cloths for Anime Lovers</span>
        <a href="/Anime-Collection"><button className="white">Collection</button></a>
    </div>

    
</section>





<section id="banner3">
    

    <div className="banner-box banner-box3">
        <h2>Upcomming Cloths</h2>
        <h3>New Arrival Collection -20% OFF</h3>
        <button className="white"onClick={itsafunction}>Check Out</button>
        
    </div>
</section>
</div>




</>}   
   </>


  )
}

export default Home
