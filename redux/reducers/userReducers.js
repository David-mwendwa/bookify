import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
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
      return {
        loading: false,
        success: true,
      };

    case LOAD_USER_SUCCESS:
      return {
        loading: false,
        authenticated: true,
        user: action.payload,
      };

    case USER_REGISTER_FAIL:
    case LOAD_USER_FAIL:
      return { loading: false, error: action.payload };

    case CLEAR_ERRORS:
      return { ...state, error: null };

    default:
      return state;
  }
};
