import { createStore, combineReducers, applyMiddleware } from 'redux';
import { HYDRATE, createWrapper } from 'next-redux-wrapper';
import thunkMiddleware from 'redux-thunk';
import {
  allRoomsReducer,
  checkReviewReducer,
  newReviewReducer,
  newRoomReducer,
  roomDetailsReducer,
  roomReducer,
} from './reducers/roomReducers';
import {
  allUsersReducer,
  authReducer,
  forgotPasswordReducer,
  loadedUserReducer,
  userDetailsReducer,
  userReducer,
} from './reducers/userReducers';
import {
  bookedDatesReducer,
  bookingDetailsReducer,
  bookingReducer,
  bookingsReducer,
  checkBookingReducer,
} from './reducers/bookingReducers';

const reducers = combineReducers({
  allRooms: allRoomsReducer,
  roomDetails: roomDetailsReducer,
  auth: authReducer,
  user: userReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  loadedUser: loadedUserReducer,
  forgotPassword: forgotPasswordReducer,
  checkBooking: checkBookingReducer,
  bookedDates: bookedDatesReducer,
  bookings: bookingsReducer,
  booking: bookingReducer,
  bookingDetails: bookingDetailsReducer,
  newReview: newReviewReducer,
  checkReview: checkReviewReducer,
  newRoom: newRoomReducer,
  room: roomReducer,
});

const bindMiddlware = (middlware) => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension');
    return composeWithDevTools(applyMiddleware(...middlware));
  }

  return applyMiddleware(...middlware);
};

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    return nextState;
  } else {
    return reducers(state, action);
  }
};

const middleware = [thunkMiddleware];

const initStore = () => {
  return createStore(reducer, bindMiddlware(middleware));
};

export const wrapper = createWrapper(initStore);
