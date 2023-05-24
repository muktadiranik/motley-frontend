import {
  SAVE_CART_AS_ORDER_REQUEST,
  SAVE_CART_AS_ORDER_SUCCESS,
  SAVE_CART_AS_ORDER_FAILED,
  GET_ORDER_ITEMS_REQUEST,
  GET_ORDER_ITEMS_SUCCESS,
  GET_ORDER_ITEMS_FAILED,
} from "../constants/orderConstants";

export const saveCartToOrderReducer = (state = { orderItems: {} }, action) => {
  switch (action.type) {
    case SAVE_CART_AS_ORDER_REQUEST:
      return { isLoading: true };
    case SAVE_CART_AS_ORDER_SUCCESS:
      return { isLoading: false, orderItems: action.payload };
    case SAVE_CART_AS_ORDER_FAILED:
      return { isLoading: false, error: action.payload };

    default:
      return state;
  }
};

export const getOrderItemsReducer = (state = { orderItems: {} }, action) => {
  switch (action.type) {
    case GET_ORDER_ITEMS_REQUEST:
      return { isLoading: true };
    case GET_ORDER_ITEMS_SUCCESS:
      return { isLoading: false, orderItems: action.payload };
    case GET_ORDER_ITEMS_FAILED:
      return { isLoading: false, error: action.payload };

    default:
      return state;
  }
};
