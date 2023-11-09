import { useState, useEffect } from 'react';
import './shop.css';
import MetaData from '../layout/MetaData';
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import { clearErrors, getProduct, searchedproduct } from '../../actions/ProductActions';
import React from 'react';
import Product from '../Home/Product';
import Searchproduct from './searchproduct';


const Search = ({ history }) => {
  const [keyword, setKeyword] = useState('');
  const [currentClassName, setCurrentClassName] = useState('killer-from1'); // Initialize with the first class name

  const alert = useAlert();
  const dispatch = useDispatch();
  const { error, products } = useSelector((state) => state.products);

  const classNames = ['killer-from1', 'killer-from2', 'killer-from3', 'killer-from4', 'killer-from5', 'killer-from6', 'killer-from7'];
  const totalClassNames = classNames.length;

  const getNextClassName = () => {
    const currentIndex = classNames.indexOf(currentClassName);
    if (currentIndex >= 0) {
      const nextIndex = (currentIndex + 1) % totalClassNames; // Loop back to the first class after the last one
      return classNames[nextIndex];
    }
    return currentClassName; // Return the current class name if it's not found in the array
  };

  const changeClassName = () => {
    const nextClassName = getNextClassName();
    setCurrentClassName(nextClassName);
  };

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/result/${keyword}`);
    } else {
      history.push('/result');
    }
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(searchedproduct());
  }, [dispatch, error, alert]);

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  useEffect(() => {
    // Check the screen size
    const handleResize = () => {
      if (window.innerWidth > 499) {
        setCurrentClassName('killer-from1'); // Apply 'killer-from1' if the screen size is larger than 499px
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Call it once to set the initial class

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <MetaData title={` Search -FashionBoi`} />

      <div className={currentClassName}>
        <form id="newsletter1" className="section-p1 section-m1" onSubmit={searchSubmitHandler}>
          <div className="newstext"></div>

          <div className="form">
            <input type="text" placeholder="Enter What You Want" onChange={(e) => setKeyword(e.target.value)}></input>
            <button className="normalnhi" type="submit" value="Search">
              <i className="fas fa-search"></i> Search
            </button>
          </div>
        </form>
      </div>
      <h2 id="seachhere">You May Like</h2>
      <h4 id="seachhere1">Our Most Popular Ones</h4>
      <p id="homeFeature"></p>

      <div className="productCard">
        <section id="product1" className="section-p1">
          <div className="pro-container">
            {products &&
              products.map((product, curry) => (
                <Searchproduct key={curry} product={product} />
              ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default Search;
