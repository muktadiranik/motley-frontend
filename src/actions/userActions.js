import axios from "axios";
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
import store from "../store";

export const getUserInfo = () => async (dispatch) => {
  dispatch({ type: USER_LOGIN_REQUEST });
  if (localStorage.getItem("userInfo")) {
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: JSON.parse(localStorage.getItem("userInfo")),
    });
  } else {
    dispatch({ type: USER_LOGOUT });
  }
};

export const loginUser = (email, password) => async (dispatch) => {
  dispatch({ type: USER_LOGIN_REQUEST });

  axios
    .post("/auth/token/", {
      email: email,
      password: password,
    })
    .then((response) => {
      return response.data;
    })
    .then((data) => {
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
    })
    .catch((error) => {
      dispatch({ type: USER_LOGIN_FAILED, payload: error });
    });
};

export const registerUser =
  (email, firstName, lastName, phone, password) => async (dispatch) => {
    dispatch({ type: USER_REGISTRATION_REQUEST });
    axios
      .post("/auth/users/register/", {
        email: email,
        first_name: firstName,
        last_name: lastName,
        phone: phone,
        password: password,
      })
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        dispatch({ type: USER_REGISTRATION_SUCCESS, payload: data });
        localStorage.setItem("userInfo", JSON.stringify(data));
        dispatch({
          type: USER_LOGIN_SUCCESS,
          payload: JSON.parse(localStorage.getItem("userInfo")),
        });
      })
      .then(() => {
        dispatch({ type: USER_REGISTRATION_LOGIN });
      })
      .catch((error) => {
        dispatch({ type: USER_REGISTRATION_FAILED, payload: error });
      });
  };

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: USER_DETAILS_RESET });
};

export const getUserDetails = () => async (dispatch) => {
  dispatch({ type: USER_DETAILS_REQUEST });
  const { loginReducer } = store.getState();
  axios
    .get("/auth/users/me/", {
      headers: {
        Authorization: `Bearer ${loginReducer.userInfo.access}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .then((data) => {
      dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
    })
    .catch((error) => {
      dispatch({ type: USER_DETAILS_FAILED, payload: error });
    });
};

export const updateUserDetails =
  (firstName, lastName, phone, password) => async (dispatch) => {
    dispatch({ type: USER_DETAILS_UPDATE_REQUEST });
    const { loginReducer } = store.getState();
    axios
      .put(
        "/auth/users/me/",
        {
          id: loginReducer.userInfo.id,
          email: loginReducer.userInfo.email,
          first_name: firstName,
          last_name: lastName,
          phone: phone,
          password: password,
          is_superuser: loginReducer.userInfo.is_superuser,
          is_staff: loginReducer.userInfo.is_staff,
        },
        {
          headers: {
            Authorization: `Bearer ${loginReducer.userInfo.access}`,
          },
        }
      )
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        localStorage.setItem("userInfo", JSON.stringify(data));
      })
      .then(() => {
        dispatch({
          type: USER_DETAILS_UPDATE_SUCCESS,
          payload: JSON.parse(localStorage.getItem("userInfo")),
        });
      })
      .then(() => {
        dispatch({ type: USER_DETAILS_UPDATE_RESET });
      })
      .catch((error) => {
        dispatch({ type: USER_DETAILS_UPDATE_FAILED, payload: error });
      });
  };
