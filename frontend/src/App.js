import Header from "./component/layout/Header/Header.js";
import Footer from "./component/layout/Footer/Footer.js";
import Home from "./component/Home/Home";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProductDetails from "./component/Product/ProductDetails.js";
import ShopProduct from "./component/Product/products";
import Search from "./component/Product/Search.js";
import LoginSignup from "./component/User/LoginSignup.js";
import store from "./Store";
import { loadUser } from "./actions/userAction.js";
import Profile from "./component/User/profile.js";
import ProtectedRoute from "./component/Route/ProtectedRoute.js";
import VerifyProtectedRoute from "./component/Route/verifyprotectedRoute.js";
import UpdateProfile from "./component/User/UpdateProfile.js";
import UpdatePassword from "./component/User/UpdatePassword.js";
import ForgotPassoword from "./component/User/ForgotPassoword.js";
import ResetPassword from "./component/User/ResetPassword.js";
import Cart from "./component/Cart/Cart.js";
import Shipping from "./component/Cart/Shipping.js";
import ConfirmOrder from "./component/Cart/ConfirmOrder.js";
import Payment from "./component/Cart/Payment.js";
import { useState, useEffect } from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import OrderSuccess from "./component/Cart/Success.js";
import MyOrder from "./component/Order/MyOrder.js";
import OrderDetails from "./component/Order/OrderDetails.js";
import DashBoard from "./component/Admin/DashBoard.js";
import AdminProducts from "./component/Admin/AdminProducts.js"
import NewProduct from "./component/Admin/NewProduct.js";
import UpdateProduct from "./component/Admin/UpdateProduct.js"
import OrderList from "./component/Admin/OrderList.js"
import ProcessOrder from "./component/Admin/ProcessOrder.js"
import userList from "./component/Admin/userList.js"
import EditUserAdmin from "./component/Admin/EditUserAdmin.js"
import EditReviewsAdmin from "./component/Admin/EditReviewsAdmin.js"
import contact from "./component/Extra/Aboutus.js"
import AboutUs from "./component/Extra/RealAbout.js"
import Success2 from "./component/Cart/success2.js";
import notfound from "./component/Extra/notfound.js";
import Offers from "./component/Product/offers.js";
import UpcommingSeason from "./component/Product/UpcommingSeason.js";
import PrivicyPolicy from "./component/Extra/privicypolicy.js"
import Termsofservice from "./component/Extra/termsofservice.js"
import Refund from "./component/Extra/Refund.js"
import cancellation from "./component/Extra/Cancellation.js"
import Verify from "./component/User/Verify.js";
import verification from "./component/User/conformverification.js"
import Ordercancallation from "./component/Extra/cancel.js"
import {disableReactDevTools} from '@fvilers/disable-react-devtools'



disableReactDevTools()
function App() {
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }
  useEffect(() => {
    store.dispatch(loadUser());

    getStripeApiKey();
  }, []);
  
   
  
  
  return (
    <>
      <Router>
        <Header />

        
        {stripeApiKey && (
          <Elements stripe={loadStripe(stripeApiKey)}>
            <ProtectedRoute exact path="/process/payment" component={Payment} />
          </Elements>
        )}

        <Switch>
        <Route exact path="/" component={Home} />

<Route exact path="/product/:id" component={ProductDetails} />

<Route exact path="/Shop" component={ShopProduct} />
<Route exact path="/offers" component={Offers} />
<Route exact path="/Privicy-Policy" component={PrivicyPolicy} />
<Route exact path="/Terms&service" component={Termsofservice} />
<Route exact path="/Refund&Return" component={Refund} />
<Route exact path="/Cancellation" component={cancellation} />

<VerifyProtectedRoute exact path="/verify/:token" component={verification}/>

<Route exact path="/help" component={contact} />
<Route exact path="/contact" component={contact} />
<Route exact path="/Order-Cancellation" component={Ordercancallation} />

<Route exact path="/Anime-Collection" component={UpcommingSeason} />


<Route exact path="/AboutUs" component={AboutUs} />
<Route exact path="/search" component={Search} />

<Route path="/products/:keyword" component={ShopProduct} />
<Route path="/result/:keyword" component={ShopProduct} />
<Route exact path="/login" component={LoginSignup} />
<ProtectedRoute exact path="/account" component={Profile} />
<ProtectedRoute exact path="/me/update" component={UpdateProfile} />
<ProtectedRoute
  exact
  path="/password/update"
  component={UpdatePassword}
/>
<ProtectedRoute exact path="/shipping" component={Shipping} />


<ProtectedRoute exact path="/order/success" component={OrderSuccess} />
<VerifyProtectedRoute exact path="/Verification" component={Success2} />

<ProtectedRoute exact path="/orders" component={MyOrder} />
<Route exact path="/password/forgot" component={ForgotPassoword} />
<Route exact path="/password/reset/:token" component={ResetPassword} />

<Route exact path="/cart" component={Cart} />



  <ProtectedRoute
    exact
    path="/order/confirm"
    component={ConfirmOrder}
  />

  <ProtectedRoute exact path="/order/:id" component={OrderDetails} />


<ProtectedRoute
  isAdmin={true}
  exact
  path="/admin/dashboard"
  component={DashBoard}
/>

<ProtectedRoute
  isAdmin={true}
  exact
  path="/admin/product/:id"
  component={UpdateProduct}
/>

<ProtectedRoute
  isAdmin={true}
  exact
  path="/admin/orders"
  component={OrderList}
/>

<ProtectedRoute
  isAdmin={true}
  exact
  path="/admin/order/:id"
  component={ProcessOrder}
/>

<ProtectedRoute
  isAdmin={true}
  exact
  path="/admin/users"
  component={userList}
/>


<ProtectedRoute
  isAdmin={true}
  exact
  path="/admin/product"
  component={NewProduct}
/>

<ProtectedRoute
  isAdmin={true}
  exact
  path="/admin/products"
  component={AdminProducts}
/>

<ProtectedRoute
  isAdmin={true}
  exact
  path="/admin/user/:id"
  component={EditUserAdmin}
/>

<ProtectedRoute
  isAdmin={true}
  exact
  path="/admin/reviews"
  component={EditReviewsAdmin}
/>







        </Switch>

        <Footer />
      </Router>
    </>
  );
}

export default App;
