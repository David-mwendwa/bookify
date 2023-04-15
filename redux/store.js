import { createStore, combineReducers, applyMiddleware } from 'redux';
import { HYDRATE, createWrapper } from 'next-redux-wrapper';
import thunkMiddleware from 'redux-thunk';
import {
  allRoomsReducer,
  checkReviewReducer,
  newReviewReducer,
  newRoomReducer,
  roomDetailsReducer,
} from './reducers/roomReducers';
import {
  authReducer,
  forgotPasswordReducer,
  loadedUserReducer,
  userReducer,
} from './reducers/userReducers';
import {
  bookedDatesReducer,
  bookingDetailsReducer,
  bookingsReducer,
  checkBookingReducer,
} from './reducers/bookingReducers';

const reducers = combineReducers({
  allRooms: allRoomsReducer,
  roomDetails: roomDetailsReducer,
  auth: authReducer,
  user: userReducer,
  loadedUser: loadedUserReducer,
  forgotPassword: forgotPasswordReducer,
  checkBooking: checkBookingReducer,
  bookedDates: bookedDatesReducer,
  bookings: bookingsReducer,
  bookingDetails: bookingDetailsReducer,
  newReview: newReviewReducer,
  checkReview: checkReviewReducer,
  newRoom: newRoomReducer,
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
