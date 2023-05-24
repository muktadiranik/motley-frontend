import axios from "axios";
import {
  SSALCOMMERZ_REQUEST,
  SSALCOMMERZ_SUCCESS,
  SSALCOMMERZ_FAILED,
  SAVE_CART_AS_ORDER_REQUEST,
  SAVE_CART_AS_ORDER_SUCCESS,
  SAVE_CART_AS_ORDER_FAILED,
  GET_ORDER_ITEMS_REQUEST,
  GET_ORDER_ITEMS_SUCCESS,
  GET_ORDER_ITEMS_FAILED,
} from "../constants/orderConstants";
import store from "../store";

export const sslcommerzGatewayAction = (data) => async (dispatch) => {
  dispatch({ type: SSALCOMMERZ_REQUEST });
  console.log(data);
  const { loginReducer } = store.getState();
  axios
    .post("/sslcommerz/", data, {
      headers: {
        Authorization: `Bearer ${loginReducer.userInfo.access}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .then((data) => {
      dispatch({ type: SSALCOMMERZ_SUCCESS, payload: data });
      window.location.replace(data.GatewayPageURL);
    })
    .catch((error) => {
      dispatch({ type: SSALCOMMERZ_FAILED, payload: error });
    });
};

export const placeOrder = (shippingAddress) => async (dispatch) => {
  dispatch({ type: SAVE_CART_AS_ORDER_REQUEST });
  const data = {
    ...JSON.parse(localStorage.getItem("orderInfo")),
    ...shippingAddress,
  };
  console.log(data);
  const { loginReducer } = store.getState();
  axios
    .post("/orders/", data, {
      headers: {
        Authorization: `Bearer ${loginReducer.userInfo.access}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .then((data) => {
      dispatch({ type: SAVE_CART_AS_ORDER_SUCCESS, payload: data });
      localStorage.removeItem("orderInfo");
      localStorage.removeItem("cartId");

      console.log(data);
    })
    .catch((error) => {
      dispatch({ type: SAVE_CART_AS_ORDER_FAILED, payload: error });
      console.log(error);
    });
};

export const getOrderItems = () => async (dispatch) => {
  dispatch({ type: GET_ORDER_ITEMS_REQUEST });
  const { loginReducer } = store.getState();
  axios
    .get("/orders/", {
      headers: {
        Authorization: `Bearer ${loginReducer.userInfo.access}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .then((data) => {
      dispatch({ type: GET_ORDER_ITEMS_SUCCESS, payload: data });
      console.log(data);
    })
    .catch((error) => {
      dispatch({ type: GET_ORDER_ITEMS_FAILED, action: error });
      console.log(error);
    });
};
