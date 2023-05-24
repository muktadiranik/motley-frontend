import {
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAILED,
} from "../constants/categoryConstants";

export const categoryListReducer = (state = { categoryList: [] }, action) => {
  switch (action.type) {
    case CATEGORY_LIST_REQUEST:
      return { isLoading: true, categoryList: [] };

    case CATEGORY_LIST_SUCCESS:
      return { isLoading: false, categoryList: action.payload };

    case CATEGORY_LIST_FAILED:
      return { isLoading: false, error: action.payload };

    default:
      return state;
  }
};
