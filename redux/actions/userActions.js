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
  console.log({ user });
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

// clear errors
export const clearErrors = () => async (dispatch) => {
  try {
    dispatch({ type: CLEAR_ERRORS });
  } catch (error) {
    console.log('ERROR', error);
  }
};