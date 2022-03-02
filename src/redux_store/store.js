import { createStore } from "redux";
import {
  reducers,
  cartReducers,
  reducersProductItem,
  loginReducers,
} from "./reducer.js";
import { applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";
import { combineReducers } from "redux";
import { userdetailsReducer } from "./user_store/userReducers";
import axios from "axios";
import { shippingReducer } from "./shipping_store/shippingReducer";
import {cartItemsReducer} from './cart_store/cartReducer'
import {alluserdetailsReducer} from './user_store/userReducers'

const allReducers = combineReducers({
  products: reducers,
  carts: cartReducers,
  productItem: reducersProductItem,
  login: loginReducers,
  userProfile: userdetailsReducer,
  shippingAddress: shippingReducer,
  cartItems:cartItemsReducer,
  allusers:alluserdetailsReducer,
});


// async function example() {
//   await axios.get("http://localhost:5000/cart/fetchitems")
//   .then(res=>{console.log(res.data)})
// }

// example()


const store = createStore(
  allReducers,
  {},
  composeWithDevTools(applyMiddleware(thunk))
);




store.subscribe(() => {
  store.getState();
  //console.log(store.getState());
  //console.log("length", store.getState().carts.cart_item_data.length);

  // if (store.getState().carts && store.getState().carts.cart_item_data.length) {
  //   console.log("length", store.getState().carts.cart_item_data.length);
  //   let arr = [];
  //   let data = {};
  //   let x = 0;
  //   for (let i of store.getState().carts.cart_item_data) {
  //     console.log("product details", i._id, i.qty);
  //     console.log(i);
  //     arr.push({ _id: x, productid: i._id, qty: i.qty });
  //     x++;
  //   }
  //   console.log(arr);
  //   console.log("login", localStorage.getItem("user"));
  //   axios
  //     .post("http://localhost:5000/cart/postitems", {
  //       userid: localStorage.getItem("user"),
  //       cartitems: arr,
  //     })
  //     .then((res) => console.log(res))
  //     .catch((err) => console.log(err.response));
  // }
});

export {store}