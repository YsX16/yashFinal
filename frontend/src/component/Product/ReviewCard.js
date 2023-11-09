import React from 'react'
import {Rating} from "@material-ui/lab"
import profilephoto from "../../img/profile.jpg"
import "./Review.css"
import { orange } from '@material-ui/core/colors'


const ReviewCard = ({review}) => {
    const options = { 
        size: "medium",
        value: review.rating,
        readOnly: true,
        precision: 0.5,
      }
  return (
    <>
   
           

   <section id="testimonials">
      
      <div className="testimonial-heading">
          
      </div>
      
      <div className="testimonial-box-container">
          
          <div className="testimonial-box">
              
              <div className="box-top">
                 
                  <div className="profile">
                     
                      <div className="profile-img">
                      <img src={review.userprofile} alt="user" className="profilephoto" />
                      </div>
                      
                      <div className="name-user">
                      <h3 className='prodreview' >{review.name}</h3>
                     
                      </div>
                  </div>
                  <div className="reviews">
                  <Rating {...options}  />
                  </div>
                 
              </div>
              
             
              <div className="client-comment">
              <h3 className="prodreview">{review.comment}</h3>
              </div>
          </div>
          </div>
      </section>
                


    </>
  )
}

export default ReviewCard

