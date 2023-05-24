import axios from "axios";
import {
  CREATE_CART_REQUEST,
  CREATE_CART_SUCCESS,
  CREATE_CART_FAILED,
  GET_CART_REQUEST,
  GET_CART_SUCCESS,
  GET_CART_FAILED,
  GET_CART_SUMMARY_REQUEST,
  GET_CART_SUMMARY_SUCCESS,
  GET_CART_SUMMARY_FAILED,
  ADD_CART_ITEM_REQUEST,
  ADD_CART_ITEM_SUCCESS,
  ADD_CART_ITEM_FAILED,
  UPDATE_CART_ITEM_REQUEST,
  UPDATE_CART_ITEM_SUCCESS,
  UPDATE_CART_ITEM_FAILED,
  DELETE_CART_ITEM_REQUEST,
  DELETE_CART_ITEM_SUCCESS,
  DELETE_CART_ITEM_FAILED,
  SAVE_SHIPPING_ADDRESS,
  SAVE_PAYMENT_METHOD,
  DELETE_PAYMENT_METHOD,
  DELETE_SHIPPING_ADDRESS,
} from "../constants/cartConstants";

export const createCart = () => async (dispatch) => {
  dispatch({ type: CREATE_CART_REQUEST });
  if (localStorage.getItem("cartId")) {
    dispatch({
      type: CREATE_CART_SUCCESS,
      payload: localStorage.getItem("cartId"),
    });
  } else {
    axios
      .post("/carts/", {})
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        localStorage.setItem("cartId", data.id);
        dispatch({
          type: CREATE_CART_SUCCESS,
          payload: localStorage.getItem("cartId"),
        });
      })
      .catch((error) => {
        dispatch({ type: CREATE_CART_FAILED, payload: error.message });
      });
  }
};

export const getCartItems = () => async (dispatch) => {
  if (localStorage.getItem("cartId")) {
    dispatch({ type: GET_CART_REQUEST });
    axios
      .get(`/carts/${localStorage.getItem("cartId")}/items/`)
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        dispatch({ type: GET_CART_SUCCESS, payload: data });
      })
      .catch((error) => {
        dispatch({ type: GET_CART_FAILED, payload: error.message });
      });
  }
};

export const getCartSummary = () => async (dispatch) => {
  dispatch({ type: GET_CART_SUMMARY_REQUEST });
  axios
    .get(`/carts/${localStorage.getItem("cartId")}/`)
    .then((response) => {
      return response.data;
    })
    .then((data) => {
      dispatch({ type: GET_CART_SUMMARY_SUCCESS, payload: data });
    })
    .catch((error) => {
      dispatch({ type: GET_CART_SUMMARY_FAILED, payload: error.message });
    });
};

export const addCartItem = (id, quantity) => async (dispatch) => {
  dispatch({ type: ADD_CART_ITEM_REQUEST });
  axios
    .post(`/carts/${localStorage.getItem("cartId")}/items/`, {
      product_id: id,
      quantity: quantity,
    })
    .then((response) => {
      return response.data;
    })
    .then((data) => {
      dispatch({ type: ADD_CART_ITEM_SUCCESS, payload: data });
    })
    .catch((error) => {
      dispatch({ type: ADD_CART_ITEM_FAILED, payload: error.message });
    });
};

export const updateCartItem = (id, quantity) => async (dispatch) => {
  dispatch({ type: UPDATE_CART_ITEM_REQUEST });
  axios
    .patch(`/carts/${localStorage.getItem("cartId")}/items/${id}/`, {
      quantity: `${quantity}`,
    })
    .then((response) => {
      return response.data;
    })
    .then((data) => {
      dispatch({ type: UPDATE_CART_ITEM_SUCCESS, payload: data });
    })
    .catch((error) => {
      dispatch({ type: UPDATE_CART_ITEM_FAILED, pryload: error.message });
      console.log(error.message);
    });
};

export const deleteCartItem = (id) => async (dispatch) => {
  dispatch({ type: DELETE_CART_ITEM_REQUEST });
  axios
    .delete(`/carts/${localStorage.getItem("cartId")}/items/${id}/`)
    .then(() => {
      dispatch({ type: DELETE_CART_ITEM_SUCCESS });
    })
    .catch((error) => {
      dispatch({ type: DELETE_CART_ITEM_FAILED, payload: error });
    });
};

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: SAVE_SHIPPING_ADDRESS,
    payload: data,
  });
  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

export const deleteShippingAddress = () => (dispatch) => {
  dispatch({ type: DELETE_SHIPPING_ADDRESS });
  localStorage.removeItem("shippingAddress");
};

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: SAVE_PAYMENT_METHOD,
    payload: data,
  });
  localStorage.setItem("paymentMethod", data);
};

export const deletePaymentMethod = (data) => (dispatch) => {
  dispatch({ type: DELETE_PAYMENT_METHOD });
  localStorage.removeItem("paymentMethod");
};
