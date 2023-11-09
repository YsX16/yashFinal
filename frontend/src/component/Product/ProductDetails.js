import React, { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getProductDetails,
  newReview,
} from "../../actions/ProductActions";
import "./productkicss.css";
import ReviewCard from "./ReviewCard.js";
import Loader from "../layout/loading/loader";
import { useAlert } from "react-alert";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";
import MetaData from "../layout/MetaData";
import { addItemsToCart } from "../../actions/cartAction";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import sheild from "../../img/shield.png";
import truck from "../../img/truck.png";
import truck2 from "../../img/truck2.png";
import fasttruck from "../../img/fast truck.png";
import certified from "../../img/certified.png";
// import {disableReactDevTools} from '@fvilers/disable-react-devtools'


// disableReactDevTools()
const ProductDetails = ({ match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const { products } = useSelector((state) => state.products);

  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );
  const helloji = user && user.avatar && user.avatar.url;

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getProductDetails(match.params.id));
  }, [dispatch, match.params.id, error, alert, reviewError, success]);

  const options = {
    size: "large",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("Select Size");
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [userprofile, setuserprofile] = useState();
  const [usercountry, setusercountry] = useState();

  const increaseQuantity = () => {
    if (product.Stock <= quantity) return;
    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;

    const qty = quantity - 1;
    setQuantity(qty);
  };

  const addToCartHandler = () => {
    if (size === "Select Size") {
      alert.error("please choose size");
    } else {
      dispatch(addItemsToCart(match.params.id, quantity, size));
      alert.success("item Added to cart");
    }
  };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
    setuserprofile(helloji);
  };
  const reviewSubmitHandler = () => {
    if (rating === 0) {
      alert.error("please rate the product");
    } else if (comment === "") {
      alert.error("Please Enter Some feedback :) ");
    } else {
      const myForm = new FormData();
      myForm.set("userprofile", userprofile);
      myForm.set("rating", rating);
      myForm.set("comment", comment);
      myForm.set("productId", match.params.id);

      dispatch(newReview(myForm));

      setOpen(false);
    }
  };

  async function fetchText (){
    let url = 'https://ipinfo.io/json?token=9f9ae00ac86a9f';
    let response = await fetch(url)
    let data = await response.json();
    setusercountry(data.country)
    
  }



  const deliveryinfo = () => {
    var coll = document.getElementsByClassName("collapsibles");
    var i;

    for (i = 0; i < coll.length; i++) {
      coll[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var contents = this.nextElementSibling;
        if (contents.style.maxHeight) {
          contents.style.maxHeight = null;
        } else {
          contents.style.maxHeight = contents.scrollHeight + "px";
        }
      });
    }
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={` ${product.name} -FashionBoi`} />
          {window.onload === true ? deliveryinfo : null}
          <section id="prodetails" className="section-p1">
            <div className="single-pro-image">
              <Carousel>
                {product.images &&
                  product.images.map((item, i) => (
                    <img
                      id="MainImg"
                      key={item.url}
                      src={item.url}
                      alt={`${i} Slide`}
                    ></img>
                  ))}
              </Carousel>

              {/* carosusel problem take notes of it */}
            </div>

            <div className="single-pro-details">
              <h3 id="YourName">{product.name}</h3>
              <a href="#reviewsdiv">
                <Rating {...options} />
                <span id="reviewquantity">
                  ({product.numOfReviews} Reviews)
                </span>
              </a>
              <div id="iambatman">
                <h3 id="oneanother">${product.price}</h3>
                {product.discount === undefined ? null : (
                  <h3 id="priceh313">{` ${product.discount}`}</h3>
                )}
              </div>
              <select
                name="links"
                id="sizevalue"
                onChange={(e) => setSize(e.target.value)}
                onClick={fetchText}
              >
                <option>Select Size</option>

                <option value="medium">Medium</option>
                <option value="large">Large</option>
                <option value="small">Small</option>
                <option value="XL">XL</option>
                <option value="XXL">XXL</option>
              </select>
{size === "Select Size" ? null : <p>Please check the <a href="#oneanother">Size Chart</a>; no return policy available in {usercountry}</p>}

              <button
                id="normalthirteen"
                className="textback"
                onClick={decreaseQuantity}
              >
                <i className="fas fa-caret-square-left"></i>
              </button>
              <input readOnly type="number" value={quantity}></input>
              <button
                id="normalthirteen1"
                className="textback"
                onClick={increaseQuantity}
              >
                <i className="fas fa-caret-square-right"></i>
              </button>{" "}
              <button
                className="normal"
                id="idontknow"
                disable={product.Stock < 1 ? true : false}
                onClick={addToCartHandler}
              >
                Add to Cart
              </button>
              <h4 className="Status">
                <h3 id="statusss">Status: </h3>
                <p className={product.Stock < 1 ? "redColor" : "greenColor"}>
                  {product.Stock < 1 ? "OUT OF STOCK" : "IN STOCK"}
                </p>
              </h4>
              {product.variationoneurl === "default" ? null : (
                <section>
                  <h2 className="variations">Choose Color</h2>

                  <a href={product.variationoneurl}>
                    <img
                      src={product.variationoneImg}
                      className="variationsimages"
                      alt="img"
                    />
                  </a>
                  {product.variationtwourl === "default" ? null : (
                    <a href={product.variationtwourl}>
                      <img
                        src={product.variationtwoImg}
                        className="variationsimages"
                        alt="img"
                      />
                    </a>
                  )}
                  {product.variationthreeurl === "default" ? null : (
                    <a href={product.variationthreeurl}>
                      <img
                        src={product.variationthreeImg}
                        className="variationsimages"
                        alt="img"
                      />
                    </a>
                  )}
                  {product.variationfoururl === "default" ? null : (
                    <a href={product.variationfoururl}>
                      <img
                        src={product.variationfourImg}
                        className="variationsimages"
                        alt="img"
                      />
                    </a>
                  )}
                  {product.variationfiveurl === "default" ? null : (
                    <a href={product.variationfiveurl}>
                      <img
                        src={product.variationfiveImg}
                        className="variationsimages"
                        alt="img"
                      />
                    </a>
                  )}
                  {product.variationsixurl === "default" ? null : (
                    <a href={product.variationsixurl}>
                      <img
                        src={product.variationsixImg}
                        className="variationsimages"
                        alt="img"
                      />
                    </a>
                  )}
                  {product.variationsevenurl === "default" ? null : (
                    <a href={product.variationsevenurl}>
                      <img
                        src={product.variationsevenImg}
                        className="variationsimages"
                        alt="img"
                      />
                    </a>
                  )}
                </section>
              )}
              <h1>Product Details</h1>
              <span>Description</span> :
              <div className="extacttext">
                <img src={product.desimgone} alt="" className="desimgall" />

                {product.description}
                <img src={product.desimgtwo} alt="" className="desimgall1" />

                {product.descriptionone}
                <img src={product.desimgthree} alt="" className="desimgall" />
                {product.descriptiontwo}

                <img src={product.desimgfour} alt="" className="desimgall1" />
              </div>
              <button className="collapsibles">Delivery Service</button>
              <div className="contents">
                <div className="exprement">
                  <img src={truck2} id="truck1" alt="" />

                  <div className="main4div">
                    <h2>Standard Delivery</h2>
                    <ul className="unorderlist">
                      <li>Standard Delivery Cost $5</li>
                      <br />
                      <li>Free Standard Delivery On Orders Above $59</li>
                      <br />
                      <li>Product Will Be Delivered Within 7 To 12 Days </li>
                    </ul>
                  </div>
                </div>

                <br />
                <br />
                <br />
                <br />

                <div className="exprement">
                  <img src={fasttruck} id="truck1" alt="" />

                  <div className="main4div">
                    <h2>Express Delivery</h2>
                    <ul className="unorderlist">
                      <li>Express Delivery Cost $10</li>
                      <br />
                      <li>Free Express Delivery On Orders Above $79</li>
                      <br />
                      <li>Product Will Be Delivered Within 5 To 7 Days </li>
                    </ul>
                  </div>
                </div>
              </div>
{/* sep */}
              <button className="collapsiblestwo">Size Chart</button>
              <div className="contentss">
                <div className="exprement">
                
                  <div className="main5div">
                   <table>
                    <tr id="sizechart">
                      <td className="sizetable"><b>SIZE</b></td> 
                      <td className="sizetable"><b>CHEST</b></td>
                      <td className="sizetable"><b>LENGTH</b></td>
                    </tr>
                    <tr>
                      <td className="sizetable">SMALL</td> 
                      <td className="sizetable">40</td>
                      <td className="sizetable">27</td>
                    </tr>
                    <tr>
                      <td className="sizetable">MEDIUM</td> 
                      <td className="sizetable">42</td>
                      <td className="sizetable">28</td>
                    </tr>
                      <tr>
                      <td className="sizetable">LARGE</td> 
                      <td className="sizetable">44</td>
                      <td className="sizetable">29</td>
                    </tr>
                    <tr>
                      <td className="sizetable">X-LARGE</td> 
                      <td className="sizetable">46</td>
                      <td className="sizetable">30</td>
                    </tr>
                    <tr>
                      <td className="sizetable">XX-LARGE</td> 
                      <td className="sizetable">48</td>
                      <td className="sizetable">31</td>
                    </tr>
                    
                   </table>
                  </div>
                </div>

               
              </div>
              <button
                className="normal"
                id="notnormal"
                onClick={submitReviewToggle}
              >
                Submit Review
              </button>
              <Dialog
                aria-labelledby="simple-dialog-title"
                open={open}
                onClose={submitReviewToggle}
              >
                <DialogTitle>Submit Review</DialogTitle>
                <DialogContent className="submitDialog">
                  <Rating
                    name="rating"
                    onChange={(e) => setRating(e.target.value)}
                    value={rating}
                    size="large"
                  />

                  <textarea
                    className="submitDialogTextArea"
                    cols="30"
                    rows="8"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  ></textarea>
                </DialogContent>
                <Button onClick={submitReviewToggle} color="secondary">
                  cancel
                </Button>

                <Button onClick={reviewSubmitHandler}>Submit</Button>
                <DialogActions></DialogActions>
              </Dialog>
            </div>
          </section>

          <div className="reviewdiv">
            <h2 className="Reviewheading" id="reviewsdiv">
              Reviews
            </h2>

            {product.reviews && product.reviews[0] ? (
              <div className="reviewdiv2">
                {product.reviews &&
                  product.reviews.map((review) => (
                    <ReviewCard key={review._id} review={review} />
                  ))}
              </div>
            ) : (
              <p className="noReviews">No Reviews Yet</p>
            )}
          </div>

          <div className="quality">
            <div className="number1">
              <img src={sheild} alt="" />
              <h4 className="numb1">Authentic Product</h4>
            </div>

            <div className="number2">
              <img src={certified} alt="" />
              <h4 className="numb1">Secure Payment</h4>
            </div>

            <div className="number3">
              <img src={truck} alt="" id="helloff" />
              <h4 className="numb2">Free Delivery</h4>
            </div>
          </div>
        </>
      )}
    </Fragment>
  );
};

export default ProductDetails;
