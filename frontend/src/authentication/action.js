import axios from "axios";
import { USER_LOADING, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS } from "../rootAction/types";
import { returnErrors } from "../rootAction/messages";

import { BASE_URL } from "../rootAction/env";

//TOKEN CONFIG
export const tokenConfig = (getState) => {
  //Get token from state
  const token = getState().authentication.token;

  // Set Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // If Token exists, add to headers configuration
  if (token) {
    config.headers["Authorization-Token"] = token;
  }

  return config;
};

//CHECK TOKEN & LOAD USER
export const loadUser = () => (dispatch, getState) => {
  // USER LOADING
  dispatch({
    type: USER_LOADING,
  });

  axios
    .get(`${BASE_URL}/auth/user`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR,
      });
    });
};

//LOGIN USER
export const loginUser = (email, password) => (dispatch, getState) => {
  axios
    .post(`${BASE_URL}/auth/login`, { email: email, password: password }, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: LOGIN_FAIL,
      });
    });
};

// LOGOUT USER
export const logoutUser = () => (dispatch, getState) => {
  axios
    .post(`${BASE_URL}/auth/logout`, {}, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: LOGOUT_SUCCESS,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};
