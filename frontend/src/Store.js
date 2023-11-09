import { createStore, combineReducers, applyMiddleware, compose} from "redux"

import thunk from "redux-thunk"



import { newProductReducer, newReviewReducer, productDetailsReducer, productReducer, productReviewsReducer, productsReducer, reviewReducer, searchReducer } from "./reducers/productReducer";
import { allUsersReducer, forgotPasswordReducer, profileReducer, userDetailsReducer, userReducer, } from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";
import {allOrdersReducer, myOrdersReducer, newOrderReducer, orderConformedmailReducer, orderDetailsReducer, orderReducer,} from "./reducers/orderReducer"
import {composeWithDevTools} from "redux-devtools-extension/developmentOnly";





const reducer = combineReducers({

products: productsReducer,
productDetails: productDetailsReducer,
user: userReducer,
profile: profileReducer,
searchResult: searchReducer,
forgotPassword: forgotPasswordReducer,
cart: cartReducer,
newOrder: newOrderReducer,
myOrders: myOrdersReducer,
orderDetails: orderDetailsReducer,
newReview: newReviewReducer,
newProduct: newProductReducer,
product: productReducer,
allOrders: allOrdersReducer,
order: orderReducer,
allUsers: allUsersReducer,
userDetails: userDetailsReducer,
productReviews: productReviewsReducer,
orderConformedMail: orderConformedmailReducer,
review: reviewReducer,

},


);




let initialState = {
    cart: {
        cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
        shippingInfo: localStorage.getItem("shippingInfo")
        ? JSON.parse(localStorage.getItem("shippingInfo"))
        : {},
    }  
     
}

const middleware = [thunk];


const store = createStore(
    reducer,
    
    initialState,
    applyMiddleware(...middleware)
)


export default store



