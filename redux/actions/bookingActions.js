import axios from 'axios';
import absoluteUrl from 'next-absolute-url';
import {
  CHECK_BOOKING_REQUEST,
  CHECK_BOOKING_SUCCESS,
  CHECK_BOOKING_FAIL,
  BOOKED_DATES_SUCCESS,
  BOOKED_DATES_FAIL,
  MY_BOOKINGS_REQUEST,
  MY_BOOKINGS_SUCCESS,
  MY_BOOKINGS_FAIL,
  BOOKING_DETAILS_REQUEST,
  BOOKING_DETAILS_SUCCESS,
  BOOKING_DETAILS_FAIL,
  ADMIN_BOOKINGS_REQUEST,
  ADMIN_BOOKINGS_SUCCESS,
  ADMIN_BOOKINGS_FAIL,
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

// check booking
export const getBookedDates = (id) => async (dispatch) => {
  try {
    let link = `/api/bookings/check_booked_dates?roomId=${id}`;
    const { data } = await axios.get(link);
    dispatch({ type: BOOKED_DATES_SUCCESS, payload: data.bookedDates });
  } catch (error) {
    dispatch({
      type: BOOKED_DATES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// check booking
export const getMyBookings = (authCookie, req) => async (dispatch) => {
  dispatch({ type: MY_BOOKINGS_REQUEST });

  try {
    const config = {
      headers: {
        cookie: authCookie,
      },
    };
    const { origin } = absoluteUrl(req);
    const { data } = await axios.get(`${origin}/api/bookings/me`, config);
    dispatch({ type: MY_BOOKINGS_SUCCESS, payload: data.bookings });
  } catch (error) {
    dispatch({
      type: MY_BOOKINGS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// get admin bookings
export const getAdminBookings = () => async (dispatch) => {
  dispatch({ type: ADMIN_BOOKINGS_REQUEST });

  try {
    const { data } = await axios.get(`/api/admin/bookings`);
    dispatch({ type: ADMIN_BOOKINGS_SUCCESS, payload: data.bookings });
  } catch (error) {
    dispatch({
      type: ADMIN_BOOKINGS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// check booking
export const getBookingDetails = (authCookie, req, id) => async (dispatch) => {
  dispatch({ type: BOOKING_DETAILS_REQUEST });

  try {
    const config = {
      headers: {
        cookie: authCookie,
      },
    };
    const { origin } = absoluteUrl(req);
    const { data } = await axios.get(`${origin}/api/bookings/${id}`, config);
    dispatch({ type: BOOKING_DETAILS_SUCCESS, payload: data.bookings });
  } catch (error) {
    dispatch({
      type: BOOKING_DETAILS_FAIL,
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
