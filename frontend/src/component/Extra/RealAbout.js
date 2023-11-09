import React from 'react'

import img1 from "../../img/features/f1.png"
import img2 from "../../img/features/f2.png" 
import img3 from "../../img/features/f3.png"
import img4 from "../../img/features/f4.png"
import img5 from "../../img/features/f5.png"
import img6 from "../../img/features/f6.png"
import mainimg from "../../img/about/a6.jpg"

const RealAbout = () => {
  return (
    <>
       <section id="page-header" class="about-header">

<h2>#Know More</h2>

<p>Read all case studies about our product! </p>

</section>

<section id="about-head" class="section-p1">
<img src={mainimg} alt="Some error occure"/>
<div className='extacttext'> 
    <h2>Who we are</h2>
    <p>Welcome to Fashionboi, where we are passionate about providing high-quality and fashionable clothing to all individuals. Our mission is to create a unique shopping experience that caters to your personal style, budget, and needs.</p>
<br />

<p>At Fashionboi, we believe that fashion is more than just clothing, it's a form of self-expression. We strive to offer the latest trends and styles, while also providing classic and timeless pieces that can be worn for years to come.</p>
<br />

<p>Our team is made up of fashion enthusiasts who are dedicated to curating the best pieces from around the world. We work hard to ensure that our collections are not only stylish but also made with quality materials that are comfortable to wear and will last.</p>
<br />
<p>We pride ourselves on excellent customer service and strive to create a seamless shopping experience for all of our customers. Whether you have a question about sizing, shipping, or just need some styling advice, our team is always happy to assist you.</p>
<br />
<p>At Fashionboi, we believe in inclusivity and diversity, and we offer clothing for individuals of all sizes, shapes, and backgrounds. We believe that everyone should have access to fashion that makes them feel confident and beautiful.</p>
<br />
<p>Thank you for choosing Fashionboi as your go-to shopping destination. We are thrilled to have you as a part of our fashion community and look forward to helping you find your perfect style.</p>
    <abbr title="We provide best quality products to you at lowest price"></abbr>

    <br/>
    
    <br/>

    <h3 >Get free coupones by supporting us on different platform </h3>
</div>
</section>

<section id="about-app" class="section-p1">

<h1>Follow us </h1>
<img src="https://www.edigitalagency.com.au/wp-content/uploads/new-Instagram-logo-png-full-colour-glyph-1200x1199.png" alt="ins" className='insfollowimglogo' />
<img src="https://yt3.googleusercontent.com/584JjRp5QMuKbyduM_2k5RlXFqHJtQ0qLIPZpwbUjMJmgzZngHcam5JMuZQxyzGMV5ljwJRl0Q=s900-c-k-c0x00ffffff-no-rj" alt="" className='followimglogo'/>

</section>
<section id="feature" class="section-p1">
<div class="fe-box">
    <img src={img1} alt=""/>
    <h6>Free Shipping</h6>
</div>
<div class="fe-box">
    <img src={img2}alt=""/>
    <h6>online order</h6>
</div>
<div class="fe-box">
    <img src={img3} alt=""/>
    <h6>Save money</h6>
</div>
<div class="fe-box">
    <img src={img4} alt=""/>
    <h6>Promotions</h6>
</div>
<div class="fe-box">
    <img src={img5} alt=""/>
    <h6>Happy Sell</h6>
</div>
<div class="fe-box">
    <img src={img6} alt=""/>
    <h6>Support</h6>
</div>
</section>

    </>
  )
}

export default RealAbout
