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
  UPDATE_CART_ITEM_REQUEST,
  UPDATE_CART_ITEM_SUCCESS,
  UPDATE_CART_ITEM_FAILED,
  DELETE_CART_ITEM_REQUEST,
  DELETE_CART_ITEM_SUCCESS,
  DELETE_CART_ITEM_FAILED,
  ADD_CART_ITEM_REQUEST,
  ADD_CART_ITEM_SUCCESS,
  ADD_CART_ITEM_FAILED,
  SAVE_SHIPPING_ADDRESS,
  DELETE_SHIPPING_ADDRESS,
  SAVE_PAYMENT_METHOD,
  DELETE_PAYMENT_METHOD,
} from "../constants/cartConstants";

export const createCartReducer = (state = { cartId: "" }, action) => {
  switch (action.type) {
    case CREATE_CART_REQUEST:
      return { cartId: "" };
    case CREATE_CART_SUCCESS:
      return { cartId: action.payload };
    case CREATE_CART_FAILED:
      return { cartId: "" };

    default:
      return state;
  }
};

export const getCartItemsReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case GET_CART_REQUEST:
      return { isLoading: true, cartItems: [] };
    case GET_CART_SUCCESS:
      return { isLoading: false, cartItems: action.payload };
    case GET_CART_FAILED:
      return { isLoading: false, error: action.payload };

    default:
      return state;
  }
};

export const getCartSummaryItemsReducer = (
  state = { cartSummary: {} },
  action
) => {
  switch (action.type) {
    case GET_CART_SUMMARY_REQUEST:
      return { isLoading: true, cartSummary: {} };
    case GET_CART_SUMMARY_SUCCESS:
      return { isLoading: false, cartSummary: action.payload };
    case GET_CART_SUMMARY_FAILED:
      return { isLoading: false, error: action.payload };

    default:
      return state;
  }
};

export const addCartItemReducer = (state = { addCartItems: {} }, action) => {
  switch (action.type) {
    case ADD_CART_ITEM_REQUEST:
      return { isAddItemLoading: true };
    case ADD_CART_ITEM_SUCCESS:
      return { isAddItemLoading: false, addCartItems: action.payload };
    case ADD_CART_ITEM_FAILED:
      return { isAddItemLoading: false, addItemError: action.payload };

    default:
      return state;
  }
};

export const updateCartItemReducer = (
  state = { updateCartItems: [] },
  action
) => {
  switch (action.type) {
    case UPDATE_CART_ITEM_REQUEST:
      return { isLoading: true, updateCartItems: [] };
    case UPDATE_CART_ITEM_SUCCESS:
      return { isLoading: false, updateCartItems: action.payload };
    case UPDATE_CART_ITEM_FAILED:
      return { isLoading: false, error: action.payload };

    default:
      return state;
  }
};

export const deleteCartItemReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_CART_ITEM_REQUEST:
      return { isLoading: true };
    case DELETE_CART_ITEM_SUCCESS:
      return { isLoading: false };
    case DELETE_CART_ITEM_FAILED:
      return { isLoading: false, error: action.payload };

    default:
      return state;
  }
};

export const shippingAddressReducer = (
  state = { shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case SAVE_SHIPPING_ADDRESS:
      return { shippingAddress: action.payload };
    case DELETE_SHIPPING_ADDRESS:
      return { shippingAddress: {} };

    default:
      return state;
  }
};

export const paymentMethodReducer = (state = { paymentMethod: {} }, action) => {
  switch (action.type) {
    case SAVE_PAYMENT_METHOD:
      return { paymentMethod: action.payload };
    case DELETE_PAYMENT_METHOD:
      return { paymentMethod: {} };

    default:
      return state;
  }
};
