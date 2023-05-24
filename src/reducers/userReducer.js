import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILED,
  USER_LOGOUT,
  USER_REGISTRATION_REQUEST,
  USER_REGISTRATION_SUCCESS,
  USER_REGISTRATION_FAILED,
  USER_REGISTRATION_LOGIN,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAILED,
  USER_DETAILS_RESET,
  USER_DETAILS_UPDATE_REQUEST,
  USER_DETAILS_UPDATE_SUCCESS,
  USER_DETAILS_UPDATE_FAILED,
  USER_DETAILS_UPDATE_RESET,
} from "../constants/userConstants";

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { isLoading: true };

    case USER_LOGIN_SUCCESS:
      return { isLoading: false, userInfo: action.payload };

    case USER_LOGIN_FAILED:
      return { isLoading: false, error: action.payload };

    case USER_LOGOUT:
      return {};

    default:
      return state;
  }
};

export const userRegistrationReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTRATION_REQUEST:
      return { isLoading: true };

    case USER_REGISTRATION_SUCCESS:
      return { isLoading: false, userInfo: action.payload };

    case USER_REGISTRATION_FAILED:
      return { isLoading: false, error: action.payload };

    case USER_REGISTRATION_LOGIN:
      return {};

    default:
      return state;
  }
};

export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { isLoading: true };

    case USER_DETAILS_SUCCESS:
      return { isLoading: false, user: action.payload };

    case USER_DETAILS_FAILED:
      return { isLoading: false, error: action.payload };

    case USER_DETAILS_RESET:
      return { user: {} };
    default:
      return state;
  }
};

export const userDetailsUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DETAILS_UPDATE_REQUEST:
      return { updateDetailsIsLoading: true };

    case USER_DETAILS_UPDATE_SUCCESS:
      return { updateDetailsIsLoading: false, userInfo: action.payload };

    case USER_DETAILS_UPDATE_FAILED:
      return {
        updateDetailsIsLoading: false,
        updateDetailsError: action.payload,
      };

    case USER_DETAILS_UPDATE_RESET:
      return {};

    default:
      return state;
  }
};
