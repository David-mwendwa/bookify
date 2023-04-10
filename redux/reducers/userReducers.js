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
  PASSWORD_FORGOT_REQUEST,
  PASSWORD_FORGOT_SUCCESS,
  PASSWORD_FORGOT_FAIL,
  PASSWORD_RESET_REQUEST,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAIL,
  CLEAR_ERRORS,
} from '../constants/userConstants';

// All rooms reducer
export const authReducer = (state = { loading: true, user: null }, action) => {
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

export const loadedUserReducer = (
  state = { loading: true, user: null },
  action
) => {
  switch (action.type) {
    case LOAD_USER_REQUEST:
      return { loading: true, authenticated: false };

    case LOAD_USER_SUCCESS:
      return { loading: false, authenticated: true, user: action.payload };

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

// forgot password reducer
export const forgotPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case PASSWORD_FORGOT_REQUEST:
    case PASSWORD_RESET_REQUEST:
      return { loading: true };

    case PASSWORD_FORGOT_SUCCESS:
      return { loading: false, message: action.payload };

    case PASSWORD_RESET_SUCCESS:
      return { loading: false, success: action.payload };

    case PASSWORD_FORGOT_FAIL:
    case PASSWORD_RESET_FAIL:
      return { loading: false, error: action.payload };

    case CLEAR_ERRORS:
      return { ...state, error: null };

    default:
      return state;
  }
};
