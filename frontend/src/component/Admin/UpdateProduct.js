import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  updateProduct,
  getProductDetails,
} from "../../actions/ProductActions";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SideBar from "./Sidebar";
import { UPDATE_PRODUCT_RESET } from "../../constants/productConstants";

const UpdateProduct = ({ history, match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, product } = useSelector((state) => state.productDetails);

  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.product);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [descriptionone, setdescriptionone] = useState("")
  const [descriptiontwo, setdescriptiontwo] = useState("")
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [isavaration, setisavaration] = useState(false)
  const [sections, setsections] = useState("")
  const [desimgone, setdesimgone] = useState("default")
  const [desimgtwo, setdesimgtwo] = useState("default")
  const [desimgthree, setdesimgthree] = useState("default")
  const [desimgfour, setdesimgfour] = useState("default")
  const [imagesPreview, setImagesPreview] = useState([]);

  const [variationoneurl, setvariationoneurl] = useState("default");
  const [variationoneImg, setvariationoneImg] = useState("");

  const [variationtwourl, setvariationtwourl] = useState("default");
  const [variationtwoImg, setvariationtwoImg] = useState("");

  const [variationthreeurl, setvariationthreeurl] = useState("default");
  const [variationthreeImg, setvariationthreeImg] = useState("");

  const [variationfoururl, setvariationfoururl] = useState("default");
  const [variationfourImg, setvariationfourImg] = useState("");

  const [variationfiveurl, setvariationfiveurl] = useState("default");
  const [variationfiveImg, setvariationfiveImg] = useState("");

  const [variationsixurl, setvariationsixurl] = useState("default");
  const [variationsixImg, setvariationsixImg] = useState("");

  const [variationsevenurl, setvariationsevenurl] = useState("default");
  const [variationsevenImg, setvariationsevenImg] = useState("");

  const categories = [
    "Hoodie",
    "SweatShirt",
    "Jackets",
    "t-shirts",
    "Anime",
    "Most-Trending",
  ];

  const sectionsopt = [
    "NewArrival",
    "Search",
    "Offers",
    "Anime-Collection",
  ]

  const productId = match.params.id;

  useEffect(() => {
    if (product && product._id !== productId) {
      dispatch(getProductDetails(productId));
    } else {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCategory(product.category);
      setStock(product.Stock);
      setOldImages(product.images);
      setisavaration(product.isavaration);
      setsections(product.sections)
      setdesimgone(product.desimgone)
      setdesimgtwo(product.desimgtwo)
      setdesimgthree(product.desimgthree)
      setdesimgfour(product.desimgfour)
      setdescriptionone(product.descriptionone)
      setdescriptiontwo(product.descriptiontwo)

      
      setvariationsevenurl(product.variationsevenurl)
      setvariationsevenImg(product.variationsevenImg)

      setvariationoneurl(product.variationoneurl)
      setvariationoneImg(product.variationoneImg)

      setvariationtwourl(product.variationtwourl)
      setvariationtwoImg(product.variationtwoImg)

      setvariationthreeurl(product.variationthreeurl)
      setvariationthreeImg(product.variationthreeImg)
      
      setvariationfoururl(product.variationfoururl)
      setvariationfourImg(product.variationfourImg)

      setvariationfiveurl(product.variationfiveurl)
      setvariationfiveImg(product.variationfiveImg)

      setvariationsixurl(product.variationsixurl)
      setvariationsixImg(product.variationsixImg)
      


    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Product Updated Successfully");
      history.push("/admin/products");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [
    dispatch,
    alert,
    error,
    history,
    isUpdated,
    productId,
    product,
    updateError,
  ]);

  const updateProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("descriptionone", descriptionone)
    myForm.set("descriptiontwo", descriptiontwo)
    myForm.set("category", category);
    myForm.set("sections", sections)
    myForm.set("Stock", Stock);
    myForm.set("isavaration", isavaration)
    myForm.set("desimgone", desimgone)
    myForm.set("desimgtwo", desimgtwo)
    myForm.set("desimgthree", desimgthree)
    myForm.set("desimgfour", desimgfour)
    myForm.set("variationoneurl", variationoneurl);
    myForm.set("variationoneImg", variationoneImg);

    myForm.set("variationtwourl", variationtwourl);
    myForm.set("variationtwoImg", variationtwoImg);

    myForm.set("variationthreeurl", variationthreeurl);
    myForm.set("variationthreeImg", variationthreeImg);

    myForm.set("variationfoururl", variationfoururl);
    myForm.set("variationfourImg", variationfourImg);

    myForm.set("variationfiveurl", variationfiveurl);
    myForm.set("variationfiveImg", variationfiveImg);

    myForm.set("variationsixurl", variationsixurl);
    myForm.set("variationsixImg", variationsixImg);

    myForm.set("variationsevenurl", variationsevenurl);
    myForm.set("variationsevenImg", variationsevenImg);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(updateProduct(productId, myForm));
  };

  const updateProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);
    setOldImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <Fragment>
      <MetaData title="Create Product" />
      <section id="form-details">
        <SideBar />
        
          
        <form
          encType="multipart/form-data"
          onSubmit={updateProductSubmitHandler}
        >
            <h1>Create Product</h1>

          
              
              <input
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

<input
                type="text"
                placeholder="isvaration"
                required
                value={isavaration}
                onChange={(e) => setisavaration(e.target.value)}
              />


<div className="categorychoose">
            <select onChange={(e) => setsections(e.target.value)}>
              <option value="">Choose Sections</option>
              {sectionsopt.map((catet) => (
                <option key={catet} value={catet}>
                  {catet}
                </option>
              ))}
            </select>
          </div>
            
            
              <input
                type="number"
                placeholder="Price"
                required
                onChange={(e) => setPrice(e.target.value)}
                value={price}
              />
          

       

          <input
            type="text"
            placeholder="discount"
            
            value={desimgone}
            onChange={(e) => setdesimgone(e.target.value)}
          />

          <textarea
            placeholder="Product Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            cols="30"
            rows="10"
          ></textarea>
        <input
            type="text"
            placeholder="discount"
            
            value={desimgtwo}
            onChange={(e) => setdesimgtwo(e.target.value)}
          />
           <textarea
            placeholder="Product Description"
            value={descriptionone}
            onChange={(e) => setdescriptionone(e.target.value)}
            cols="30"
            rows="10"
          ></textarea>
           <input
            type="text"
            placeholder="discount"
            
            value={desimgthree}
            onChange={(e) => setdesimgthree(e.target.value)}
          />
           <textarea
            placeholder="Product Description"
            value={descriptiontwo}
            onChange={(e) => setdescriptiontwo(e.target.value)}
            cols="30"
            rows="10"
          ></textarea>
          
           <input
            type="text"
            placeholder="discount"
            
            value={desimgfour}
            onChange={(e) => setdesimgfour(e.target.value)}
          />

          
           

           <div className="categorychoose">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Choose Category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
           </div>

              <input
                type="number"
                placeholder="Stock"
                required
                onChange={(e) => setStock(e.target.value)}
                value={Stock}
              />
         

            <div className="imgselecter">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={updateProductImagesChange}
                multiple
              />
            </div>

            <div className="imgpreview">
              {oldImages &&
                oldImages.map((image, index) => (
                  <img key={index} src={image.url} alt="Old Product Preview" />
                ))}
            </div>

            <div className="imgpreview">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Create
            </Button>

            <div class="border">
            <input
              type="text"
              placeholder="url one"
              value={variationoneurl}
              onChange={(e) => setvariationoneurl(e.target.value)}
            />

            <input
              type="text"
              placeholder="img"
              value={variationoneImg}
              onChange={(e) => setvariationoneImg(e.target.value)}
            />
          </div>

          <div class="border">
            <input
              type="text"
              placeholder="url one"
              value={variationtwourl}
              onChange={(e) => setvariationtwourl(e.target.value)}
            />

            <input
              type="text"
              placeholder="img"
              value={variationtwoImg}
              onChange={(e) => setvariationtwoImg(e.target.value)}
            />
          </div>

          <div class="border">
            <input
              type="text"
              placeholder="url one"
              value={variationthreeurl}
              onChange={(e) => setvariationthreeurl(e.target.value)}
            />

            <input
              type="text"
              placeholder="img"
              value={variationthreeImg}
              onChange={(e) => setvariationthreeImg(e.target.value)}
            />
          </div>

          <div class="border">
            <input
              type="text"
              placeholder="url one"
              value={variationfoururl}
              onChange={(e) => setvariationfoururl(e.target.value)}
            />

            <input
              type="text"
              placeholder="img"
              value={variationfourImg}
              onChange={(e) => setvariationfourImg(e.target.value)}
            />
          </div>

          <div class="border">
            <input
              type="text"
              placeholder="url one"
              value={variationfiveurl}
              onChange={(e) => setvariationfiveurl(e.target.value)}
            />

            <input
              type="text"
              placeholder="img"
              value={variationfiveImg}
              onChange={(e) => setvariationfiveImg(e.target.value)}
            />
          </div>

          <div class="border">
            <input
              type="text"
              placeholder="url one"
              value={variationsixurl}
              onChange={(e) => setvariationsixurl(e.target.value)}
            />

            <input
              type="text"
              placeholder="img"
              value={variationsixImg}
              onChange={(e) => setvariationsixImg(e.target.value)}
            />
          </div>

          <div class="border">
            <input
              type="text"
              placeholder="url one"
              value={variationsevenurl}
              onChange={(e) => setvariationsevenurl(e.target.value)}
            />

            <input
              type="text"
              placeholder="img"
              value={variationsevenImg}
              onChange={(e) => setvariationsevenImg(e.target.value)}
            />
          </div>
          </form>
       
     </section>
    </Fragment>
  );
};

export default UpdateProduct;
