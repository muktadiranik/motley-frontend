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

export const productListReducer = (state = { productList: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { isLoading: true, productList: [] };

    case PRODUCT_LIST_SUCCESS:
      return { isLoading: false, productList: action.payload };

    case PRODUCT_LIST_FAILED:
      return { isLoading: false, error: action.payload };

    default:
      return state;
  }
};

export const latestProductListReducer = (
  state = { productList: [] },
  action
) => {
  switch (action.type) {
    case LATEST_PRODUCT_LIST_REQUEST:
      return { isLoading: true, productList: [] };

    case LATEST_PRODUCT_LIST_SUCCESS:
      return { isLoading: false, productList: action.payload };

    case LATEST_PRODUCT_LIST_FAILED:
      return { isLoading: false, error: action.payload };

    default:
      return state;
  }
};

export const categoryProductListReducer = (
  state = { productList: [] },
  action
) => {
  switch (action.type) {
    case CATEGORY_PRODUCT_LIST_REQUEST:
      return { isLoading: true, productList: [] };

    case CATEGORY_PRODUCT_LIST_SUCCESS:
      return { isLoading: false, productList: action.payload };

    case CATEGORY_PRODUCT_LIST_FAILED:
      return { isLoading: false, error: action.payload };

    default:
      return state;
  }
};

export const productDetailsReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { isLoading: true, ...state };

    case PRODUCT_DETAILS_SUCCESS:
      return { isLoading: false, product: action.payload };

    case PRODUCT_DETAILS_FAILED:
      return { isLoading: false, error: action.payload };

    default:
      return state;
  }
};
