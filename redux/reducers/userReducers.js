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
  ADMIN_USERS_REQUEST,
  ADMIN_USERS_SUCCESS,
  ADMIN_USERS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  UPDATE_USER_RESET,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  DELETE_USER_RESET,
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
    case UPDATE_USER_REQUEST:
    case DELETE_USER_REQUEST:
      return { loading: true };

    case PROFILE_UPDATE_SUCCESS:
    case UPDATE_USER_SUCCESS:
      return { loading: false, isUpdated: true };

    case PROFILE_UPDATE_RESET:
    case UPDATE_USER_RESET:
      return { loading: false, isUpdated: false };

    case DELETE_USER_RESET:
      return { loading: false, isDeleted: false };

    case DELETE_USER_SUCCESS:
      return { loading: false, isDeleted: false };

    case PROFILE_UPDATE_FAIL:
    case UPDATE_USER_FAIL:
    case DELETE_USER_FAIL:
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

export const allUsersReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case ADMIN_USERS_REQUEST:
      return { loading: true };

    case ADMIN_USERS_SUCCESS:
      return { loading: false, users: action.payload };

    case ADMIN_USERS_FAIL:
      return { loading: false, error: action.payload };

    case CLEAR_ERRORS:
      return { ...state, error: null };

    default:
      return state;
  }
};

export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { loading: true };

    case USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload };

    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    case CLEAR_ERRORS:
      return { ...state, error: null };

    default:
      return state;
  }
};
