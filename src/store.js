import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import {
  productListReducer,
  latestProductListReducer,
  categoryProductListReducer,
  productDetailsReducer,
} from "./reducers/porductReducer";
import { categoryListReducer } from "./reducers/categoryReducer";
import {
  createCartReducer,
  getCartItemsReducer,
  getCartSummaryItemsReducer,
  updateCartItemReducer,
  deleteCartItemReducer,
  addCartItemReducer,
  shippingAddressReducer,
  paymentMethodReducer,
} from "./reducers/cartReducer";
import {
  userLoginReducer,
  userRegistrationReducer,
  userDetailsReducer,
  userDetailsUpdateReducer,
} from "./reducers/userReducer";

import {
  saveCartToOrderReducer,
  getOrderItemsReducer,
} from "./reducers/orderReducer";

const cartIdFromLocalStorage = localStorage.getItem("cartId")
  ? localStorage.getItem("cartId")
  : "";

const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const shippingAddressFromLocalStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : null;

const paymentMethodFromLocalStorage = localStorage.getItem("paymentMethod")
  ? localStorage.getItem("paymentMethod")
  : null;

const preloadedState = {
  cartReducer: { cartId: cartIdFromLocalStorage },
  loginReducer: { userInfo: userInfoFromLocalStorage },
  addressReducer: { shippingAddress: shippingAddressFromLocalStorage },
  methodReducer: { paymentMethod: paymentMethodFromLocalStorage },
};

const middleware = [thunk];

const store = configureStore({
  reducer: {
    categoryReducer: categoryListReducer,
    productReducer: productListReducer,
    latestProductReducer: latestProductListReducer,
    categoryProductReducer: categoryProductListReducer,
    detailProductReducer: productDetailsReducer,
    cartReducer: createCartReducer,
    getCartReducer: getCartItemsReducer,
    getCartSummaryReducer: getCartSummaryItemsReducer,
    loginReducer: userLoginReducer,
    registerReducer: userRegistrationReducer,
    detailsReducer: userDetailsReducer,
    detailsUpdateReducer: userDetailsUpdateReducer,
    updateCartReducer: updateCartItemReducer,
    deleteCartReducer: deleteCartItemReducer,
    addCartReducer: addCartItemReducer,
    addressReducer: shippingAddressReducer,
    methodReducer: paymentMethodReducer,
    cartToOrderReducer: saveCartToOrderReducer,
    orderItemsReducer: getOrderItemsReducer,
  },
  preloadedState: preloadedState,
  devTools: process.env.NODE_ENV !== "production",
  middleware: middleware,
});

export default store;
