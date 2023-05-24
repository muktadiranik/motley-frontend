import axios from "axios";
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAILED,
  LATEST_PRODUCT_LIST_REQUEST,
  LATEST_PRODUCT_LIST_SUCCESS,
  LATEST_PRODUCT_LIST_FAILED,
  CATEGORY_PRODUCT_LIST_REQUEST,
  CATEGORY_PRODUCT_LIST_SUCCESS,
  CATEGORY_PRODUCT_LIST_FAILED,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAILED,
} from "../constants/productConstants";

export const listCategoryProducts = (id) => async (dispatch) => {
  dispatch({ type: CATEGORY_PRODUCT_LIST_REQUEST });
  axios
    .get(`/categories/${id}`)
    .then((response) => {
      return response.data;
    })
    .then((data) => {
      dispatch({ type: CATEGORY_PRODUCT_LIST_SUCCESS, payload: data });
    })
    .catch((error) => {
      dispatch({
        type: CATEGORY_PRODUCT_LIST_FAILED,
        payload: error.message,
      });
    });
};

export const listProducts = () => async (dispatch) => {
  dispatch({ type: PRODUCT_LIST_REQUEST });
  axios
    .get("/products/")
    .then((response) => {
      return response.data;
    })
    .then((data) => {
      dispatch({
        type: PRODUCT_LIST_SUCCESS,
        payload: data,
      });
    })
    .catch((error) => {
      dispatch({
        type: PRODUCT_LIST_FAILED,
        payload: error.message,
      });
    });
};

export const listLatestProducts = () => async (dispatch) => {
  dispatch({ type: LATEST_PRODUCT_LIST_REQUEST });
  axios
    .get("/latest-products/")
    .then((response) => {
      return response.data;
    })
    .then((data) => {
      dispatch({ type: LATEST_PRODUCT_LIST_SUCCESS, payload: data });
    })
    .catch((error) => {
      dispatch({ type: LATEST_PRODUCT_LIST_FAILED, payload: error.message });
    });
};
export const productDetails = (id) => async (dispatch) => {
  dispatch({ type: PRODUCT_DETAILS_REQUEST });
  axios
    .get(`/products/${id}`)
    .then((response) => {
      return response.data;
    })
    .then((data) => {
      dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
    })
    .catch((error) => {
      dispatch({ type: PRODUCT_DETAILS_FAILED, payload: error.message });
    });
};
