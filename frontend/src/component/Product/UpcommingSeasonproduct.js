import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@material-ui/lab";
const UpcommingSeasonproduct = ({ product }) => {
  const options = {
    size: "medium",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <>
      {product.isavaration === true ? null : product.sections === "Anime-Collection" ? (
        <div className="pro" onClick={`/product/${product._id}`}>
          <a href={`/product/${product._id}`}>
            <img src={product.images[0].url} alt={product.name}></img>
          </a>

          <a href={`/product/${product._id}`}>
            <div className="des">
              <h5>{product.name}</h5>
              <div className="rating-div">
                <Rating {...options} />
                <h4> ({product.numOfReviews} Reviews)</h4>
              </div>
              <div className="heroone">
                <h3 id="priceh3">{`$ ${product.price}`}</h3>
                {product.discount === undefined ? (
                  <p></p>
                ) : (
                  <h3 id="priceh31">{` ${product.discount}`}</h3>
                )}
              </div>
            </div>
          </a>
          <a href={`/product/${product._id}`} className="mryash">
            <i className="fas fa-shopping-cart cart"></i>
          </a>
        </div>
      ) : null}
    </>
  );
};

export default UpcommingSeasonproduct;
