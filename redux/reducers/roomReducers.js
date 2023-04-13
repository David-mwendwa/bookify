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
  CLEAR_ERRORS,
} from '../constants/roomConstants';

// All rooms reducer
export const allRoomsReducer = (state = { rooms: [] }, action) => {
  switch (action.type) {
    case ALL_ROOMS_REQUEST:
      return { loading: true };

    case ALL_ROOMS_SUCCESS:
      return {
        loading: false,
        roomsCount: action.payload.roomsCount,
        resultsPerPage: action.payload.resultsPerPage,
        filteredRoomsCount: action.payload.filteredRoomsCount,
        rooms: action.payload.rooms,
      };

    case ALL_ROOMS_FAIL:
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
