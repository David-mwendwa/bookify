import {
  ALL_ROOMS_REQUEST,
  ALL_ROOMS_SUCCESS,
  ALL_ROOMS_FAIL,
  ROOM_DETAILS_REQUEST,
  ROOM_DETAILS_SUCCESS,
  ROOM_DETAILS_FAIL,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  NEW_REVIEW_RESET,
  REVIEW_AVAILABILITY_REQUEST,
  REVIEW_AVAILABILITY_SUCCESS,
  REVIEW_AVAILABILITY_FAIL,
  ADMIN_ROOMS_REQUEST,
  ADMIN_ROOMS_SUCCESS,
  ADMIN_ROOMS_FAIL,
  NEW_ROOM_REQUEST,
  NEW_ROOM_SUCCESS,
  NEW_ROOM_FAIL,
  NEW_ROOM_RESET,
  UPDATE_ROOM_REQUEST,
  UPDATE_ROOM_SUCCESS,
  UPDATE_ROOM_FAIL,
  UPDATE_ROOM_RESET,
  DELETE_ROOM_REQUEST,
  DELETE_ROOM_SUCCESS,
  DELETE_ROOM_FAIL,
  DELETE_ROOM_RESET,
  GET_REVIEWS_REQUEST,
  GET_REVIEWS_SUCCESS,
  GET_REVIEWS_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,
  DELETE_REVIEW_RESET,
  CLEAR_ERRORS,
} from '../constants/roomConstants';

// All rooms reducer
export const allRoomsReducer = (state = { rooms: [] }, action) => {
  switch (action.type) {
    case ALL_ROOMS_REQUEST:
    case ADMIN_ROOMS_REQUEST:
      return { loading: true };

    case ALL_ROOMS_SUCCESS:
      return {
        loading: false,
        roomsCount: action.payload.roomsCount,
        resultsPerPage: action.payload.resultsPerPage,
        filteredRoomsCount: action.payload.filteredRoomsCount,
        rooms: action.payload.rooms,
      };

    case ADMIN_ROOMS_SUCCESS:
      return {
        loading: false,
        rooms: action.payload,
      };

    case ALL_ROOMS_FAIL:
    case ADMIN_ROOMS_FAIL:
      return { loading: false, error: action.payload };

    case CLEAR_ERRORS:
      return { ...state, error: null };

    default:
      return state;
  }
};

// Room details reducer
export const roomDetailsReducer = (state = { room: {} }, action) => {
  switch (action.type) {
    case ROOM_DETAILS_REQUEST:
      return { loading: true };

    case ROOM_DETAILS_SUCCESS:
      return { loading: false, room: action.payload };

    case ROOM_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    case CLEAR_ERRORS:
      return { ...state, error: null };

    default:
      return state;
  }
};

//new room reducer
export const newRoomReducer = (state = { room: {} }, action) => {
  switch (action.type) {
    case NEW_ROOM_REQUEST:
      return { loading: true };

    case NEW_ROOM_SUCCESS:
      return { loading: false, success: true, room: action.payload };

    case NEW_ROOM_RESET:
      return { success: false };

    case NEW_ROOM_FAIL:
      return { loading: false, error: action.payload };

    case CLEAR_ERRORS:
      return { ...state, error: null };

    default:
      return state;
  }
};

// Room details reducer
export const roomReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_ROOM_REQUEST:
    case DELETE_ROOM_REQUEST:
      return { loading: true };

    case UPDATE_ROOM_SUCCESS:
      return { loading: false, isUpdated: action.payload };

    case DELETE_ROOM_SUCCESS:
      return { loading: false, isDeleted: action.payload };

    case UPDATE_ROOM_RESET:
      return { isUpdated: false };

    case DELETE_ROOM_RESET:
      return { isDeleted: false };

    case UPDATE_ROOM_FAIL:
    case DELETE_ROOM_FAIL:
      return { loading: false, error: action.payload };

    case CLEAR_ERRORS:
      return { ...state, error: null };

    default:
      return state;
  }
};

// Room details reducer
export const newReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_REVIEW_REQUEST:
      return { loading: true };

    case NEW_REVIEW_SUCCESS:
      return { loading: false, success: action.payload };

    case NEW_REVIEW_RESET:
      return { success: false };

    case NEW_REVIEW_FAIL:
      return { loading: false, error: action.payload };

    case CLEAR_ERRORS:
      return { ...state, error: null };

    default:
      return state;
  }
};

// Room details reducer
export const checkReviewReducer = (
  state = { reviewAvailable: null },
  action
) => {
  switch (action.type) {
    case REVIEW_AVAILABILITY_REQUEST:
      return { loading: true };

    case REVIEW_AVAILABILITY_SUCCESS:
      return { loading: false, reviewAvailable: action.payload };

    case REVIEW_AVAILABILITY_FAIL:
      return { loading: false, error: action.payload };

    case CLEAR_ERRORS:
      return { ...state, error: null };

    default:
      return state;
  }
};

export const roomReviewsReducer = (state = { reviews: [] }, action) => {
  switch (action.type) {
    case GET_REVIEWS_REQUEST:
      return { loading: true };

    case GET_REVIEWS_SUCCESS:
      return { loading: false, reviews: action.payload };

    case GET_REVIEWS_FAIL:
      return { loading: false, error: action.payload };

    case CLEAR_ERRORS:
      return { ...state, error: null };

    default:
      return state;
  }
};
export const reviewReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_REVIEW_REQUEST:
      return { loading: true };

    case DELETE_REVIEW_SUCCESS:
      return { loading: false, isDeleted: action.payload };

    case DELETE_REVIEW_RESET:
      return { isDeleted: false };

    case DELETE_REVIEW_FAIL:
      return { loading: false, error: action.payload };

    case CLEAR_ERRORS:
      return { ...state, error: null };

    default:
      return state;
  }
};
