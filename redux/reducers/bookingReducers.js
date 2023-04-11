import {
  CHECK_BOOKING_REQUEST,
  CHECK_BOOKING_SUCCESS,
  CHECK_BOOKING_FAIL,
  CHECK_BOOKING_RESET,
  CLEAR_ERRORS,
} from '../constants/bookingConstants';

// checkBooking
export const checkBookingReducer = (state = {}, action) => {
  switch (action.type) {
    case CHECK_BOOKING_REQUEST:
      return { loading: true };

    case CHECK_BOOKING_SUCCESS:
      return { loading: false, available: action.payload };

    case CHECK_BOOKING_SUCCESS:
      return { loading: false, available: null };

    case CHECK_BOOKING_FAIL:
      return { loading: false, error: action.payload };

    case CLEAR_ERRORS:
      return { ...state, error: null };

    default:
      return state;
  }
};
