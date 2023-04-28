import axios from 'axios';
import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  PROFILE_UPDATE_REQUEST,
  PROFILE_UPDATE_SUCCESS,
  PROFILE_UPDATE_FAIL,
  PASSWORD_FORGOT_REQUEST,
  PASSWORD_FORGOT_SUCCESS,
  PASSWORD_FORGOT_FAIL,
  PASSWORD_RESET_REQUEST,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAIL,
  ADMIN_USERS_REQUEST,
  ADMIN_USERS_SUCCESS,
  ADMIN_USERS_FAIL,
  CLEAR_ERRORS,
} from '../constants/userConstants';

// register user
export const register = (user) => async (dispatch) => {
  console.log({ user });
  dispatch({ type: USER_REGISTER_REQUEST });

  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
    };
    const { data } = await axios.post('/api/auth/register', user, config);
    console.log({ data });
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// load user
export const loadUser = () => async (dispatch) => {
  dispatch({ type: LOAD_USER_REQUEST });

  try {
    const { data } = await axios.get('/api/me');
    dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: LOAD_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// update profile
export const updateProfile = (user) => async (dispatch) => {
  dispatch({ type: PROFILE_UPDATE_REQUEST });

  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
    };
    const { data } = await axios.patch('/api/me/update', user, config);
    dispatch({ type: PROFILE_UPDATE_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: PROFILE_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const forgotPassword = (email) => async (dispatch) => {
  dispatch({ type: PASSWORD_FORGOT_REQUEST });

  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
    };
    const { data } = await axios.post('/api/password/forgot', email, config);
    dispatch({ type: PASSWORD_FORGOT_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      type: PASSWORD_FORGOT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const resetPassword = (token, passwords) => async (dispatch) => {
  dispatch({ type: PASSWORD_RESET_REQUEST });

  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
    };
    const { data } = await axios.patch(
      `/api/password/reset/${token}`,
      passwords,
      config
    );
    dispatch({ type: PASSWORD_RESET_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: PASSWORD_RESET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getAdminUsers = () => async (dispatch) => {
  dispatch({ type: ADMIN_USERS_REQUEST });

  try {
    const { data } = await axios.get(`/api/admin/users`);
    dispatch({ type: ADMIN_USERS_SUCCESS, payload: data.users });
  } catch (error) {
    dispatch({
      type: ADMIN_USERS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// clear errors
export const clearErrors = () => async (dispatch) => {
  try {
    dispatch({ type: CLEAR_ERRORS });
  } catch (error) {
    console.log('ERROR', error);
  }
};
