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
  PROFILE_UPDATE_RESET,
  CLEAR_ERRORS,
} from '../constants/userConstants';

// All rooms reducer
export const authReducer = (state = { user: null }, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true, authenticated: false };

    case LOAD_USER_REQUEST:
      return { loading: true, authenticated: false };

    case USER_REGISTER_SUCCESS:
      return { loading: false, success: true };

    case LOAD_USER_SUCCESS:
      return { loading: false, authenticated: true, user: action.payload };

    case USER_REGISTER_FAIL:
    case LOAD_USER_FAIL:
      return { loading: false, error: action.payload };

    case CLEAR_ERRORS:
      return { ...state, error: null };

    default:
      return state;
  }
};

// user reducer
export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case PROFILE_UPDATE_REQUEST:
      return { loading: true };

    case PROFILE_UPDATE_SUCCESS:
      return { loading: false, updated: true };

    case PROFILE_UPDATE_RESET:
      return { loading: false, updated: false };

    case PROFILE_UPDATE_FAIL:
      return { loading: false, error: action.payload };

    case CLEAR_ERRORS:
      return { ...state, error: null };

    default:
      return state;
  }
};
