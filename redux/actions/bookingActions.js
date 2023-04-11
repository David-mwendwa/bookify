import axios from 'axios';
import {
  CHECK_BOOKING_REQUEST,
  CHECK_BOOKING_SUCCESS,
  CHECK_BOOKING_FAIL,
  CHECK_BOOKING_RESET,
  CLEAR_ERRORS,
} from '../constants/bookingConstants';

// check booking
export const checkBooking =
  (roomId, checkInDate, checkOutDate) => async (dispatch) => {
    dispatch({ type: CHECK_BOOKING_REQUEST });

    try {
      let link = `/api/bookings/check?roomId=${roomId}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`;
      const { data } = await axios.get(link);
      dispatch({ type: CHECK_BOOKING_SUCCESS, payload: data.isAvailable });
    } catch (error) {
      dispatch({
        type: CHECK_BOOKING_FAIL,
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
