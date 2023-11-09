import React, { useEffect, useState } from "react";
import "./shop.css";
import { clearErrors, getProduct } from "../../actions/ProductActions";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/loading/loader";

import Pagination from "react-js-pagination";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import sadgif from "../../img/sad.mp4";
import UpcommingSeasonproduct from "./UpcommingSeasonproduct";


const categories = [
  "Hoodie",
  "SweatShirt",
  "Jackets",
  "t-shirts",
  "Anime",
  "Most-Trending",
];

const Tags = [
  "Large Sleves",
  "Small Sleves",
  "Emboriny",
  "Oversized",
  
];

const UpcommingSeason = ({ match }) => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 200]);
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTags, setSelectedTags] = useState("");
  const [ratings, setRatings] = useState(0);
  const [isOpened, setIsOpened] = useState(false);
  const [isDropdown1Open, setDropdown1Open] = useState(false);
  const [isDropdown2Open, setDropdown2Open] = useState(false);

  const toggleDropdown1 = () => {
    setDropdown1Open(!isDropdown1Open);
  };

  const toggleDropdown2 = () => {
    setDropdown2Open(!isDropdown2Open);
  };

  const [toggle, settoggle] = useState(false);
  const toggleCollapse = () => {
    setIsOpened(!isOpened);
  };

  const twotoggleCollapse = () => {
    settoggle(!toggle);
  };
  const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  const keyword = match.params.keyword;

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const lowtohigh = () => {
    setPrice([10, 30]);
  };

  const hightolow = () => {
    setPrice([30, 50]);
  };



  const Resetallcategory = () => {
    if (selectedCategory !== "") {
      setSelectedCategory("");
      setCategory("");
    } else {
      setSelectedCategory(""); // Ensure "Show-All" is checked if already selected
    }
  };
  const Resetalltags = () => {
    if (selectedTags !== "") {
      setSelectedTags("");
      setTags("");
    } else {
      setSelectedTags(""); // Ensure "Show-All" is checked if already selected
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCategory(category);
  };
  const handleCategoryChange2 = (tag) => {
    setSelectedTags(tag);
    setTags(tag);
  };


  let count = filteredProductsCount;

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getProduct(keyword, currentPage, price, category, ratings, tags));
  }, [
    dispatch,
    keyword,
    currentPage,
    price,
    category,
    ratings,
    tags,
    alert,
    error,
  ]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Offers ---fashionboi" />
          <section id="page-header11"></section>

          <br />
          <div className="buttton--containter">
            <div className={`collapsible-button ${toggle ? "open" : ""}`}>
              <button
                type="button"
                onClick={twotoggleCollapse}
                className="collapsible"
              >
                Sort<i className="fas fa-sort"></i>
              </button>
              <div className="contentsss-wrapper">
                <div className="contentsss">
                  <div className="cateone">
                    <div className="dropdown-container">
                      <div
                        className={`dropdown ${
                          isDropdown1Open ? "active" : ""
                        }`}
                      >
                        <button
                          className="dropdown-toggle"
                          onClick={toggleDropdown1}
                        >
                          Category{" "}
                          <i
                            className={`fas ${
                              isDropdown1Open
                                ? "fa-chevron-up"
                                : "fa-chevron-down"
                            }`}
                          ></i>
                        </button>
                        <div className="dropdown-content">
                          <ul className="categoryBox">
                            {categories.map((category) => (
                              <li key={category}>
                                <label>
                                  <input
                                    type="checkbox"
                                    id="check-box-shop"
                                    value={category}
                                    checked={category === selectedCategory}
                                    onChange={() =>
                                      handleCategoryChange(category)
                                    }
                                  />
                                  {category}
                                </label>
                              </li>
                            ))}
                            <li>
                              <label>
                                <input
                                  type="checkbox"
                                  value=""
                                  id="check-box-shop"
                                  checked={selectedCategory === ""}
                                  onChange={Resetallcategory}
                                />
                                Show-All
                              </label>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div
                        className={`dropdown ${
                          isDropdown2Open ? "active" : ""
                        }`}
                      >
                        <button
                          className="dropdown-toggle"
                          onClick={toggleDropdown2}
                        >
                          Designes
                          <i
                            className={`fas ${
                              isDropdown2Open
                                ? "fa-chevron-up"
                                : "fa-chevron-down"
                            }`}
                          ></i>
                        </button>{" "}
                        <div className="dropdown-content">
                          <ul className="categoryBox">
                            {Tags.map((tag) => (
                              <li key={tag}>
                                <label>
                                  <input
                                    type="checkbox"
                                    value={tag}
                                    id="check-box-shop"
                                    checked={tag === selectedTags}
                                    onChange={() => handleCategoryChange2(tag)}
                                  />
                                  {tag}
                                </label>
                              </li>
                            ))}
                            <li>
                              <label>
                                <input
                                  type="checkbox"
                                  value=""
                                  id="check-box-shop"
                                  checked={selectedTags === ""}
                                  onChange={Resetalltags}
                                />
                                Show-All
                              </label>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={`collapsible-button ${isOpened ? "open" : ""}`}>
              <button
                type="button"
                onClick={toggleCollapse}
                className="collapsible"
              >
                Filters<i className="fas fa-filter"></i>
              </button>
              <div className="contentsss">
                <div className="contentsss-wrapper">
                  <div className="filterBox">
                  
                     <h3 onClick={lowtohigh}  className="price-handlers"> Low To High<i className="fas fa-sort-amount-down-alt"></i> </h3>
                   

                   <h3 onClick={hightolow} className="price-handlers">   High To Low<i className="fas fa-sort-amount-down"></i></h3>
                
                    {/* <div className="sliderone">
           <fieldset className="pricefilter">
           <Typography component="legend">Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={100}
            />
            
           </fieldset>
           </div> */}

                  
              
                    <div>
             
                      <fieldset className="fieldsetone">
                        <Typography component="legend">
                          Ratings Above
                        </Typography>
                        <Slider
                          value={ratings}
                          onChange={(e, newRating) => {
                            setRatings(newRating);
                          }}
                          aria-labelledby="continuous-slider"
                          valueLabelDisplay="auto"
                          min={0}
                          max={5}
                        />
                      </fieldset>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {count === 0 && (
            <div className="video">
              <video className="citty" autoPlay muted loop>
                <source src={sadgif} type="video/mp4"></source>
              </video>
              <div>
                <h1 id="sorrynotfound"> Sorry! I Found Nothing </h1>
              </div>
            </div>
          )}
          <section id="product1" className="section-p1">
            <div className="pro-container">
              {products &&
                products.map((product) => (
                  <UpcommingSeasonproduct key={product._id} product={product} />
                ))}
            </div>
       
          </section>
         

          {resultPerPage < count && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default UpcommingSeason;
