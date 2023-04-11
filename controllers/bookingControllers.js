const Booking = require('../models/booking.js');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors.js');
import Moment from 'moment';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);

// create new booking => /api/bookings
export const newBooking = catchAsyncErrors(async (req, res, next) => {
  console.log('req.user', req.user);
  const {
    room,
    checkInDate,
    checkOutDate,
    daysOfStay,
    amountPaid,
    paymentInfo,
  } = req.body;

  const booking = await Booking.create({
    room,
    user: req?.user?._id || '642aac05861cf5199d280e55',
    paidAt: Date.now(),
    checkInDate,
    checkOutDate,
    daysOfStay,
    amountPaid,
    paymentInfo,
  });

  res.status(200).json({ success: true, data: booking });
});

// check room booking availability => /api/bookings/check
export const checkRoomBookingAvailability = catchAsyncErrors(
  async (req, res, next) => {
    let { roomId, checkInDate, checkOutDate } = req.query;

    checkInDate = new Date(checkInDate);
    checkOutDate = new Date(checkOutDate);

    const bookings = await Booking.find({
      room: roomId,
      $and: [
        {
          checkInDate: {
            $lte: checkOutDate,
          },
        },
        {
          checkOutDate: {
            $gte: checkInDate,
          },
        },
      ],
    });

    // check if there is any booking available
    let isAvailable;
    if (bookings && bookings.length === 0) {
      isAvailable = true;
    } else {
      isAvailable = false;
    }

    res.status(200).json({ success: true, isAvailable });
  }
);

// check booked dates of a room => /api/bookings/check_booked_dates
export const checkBookedDatesOfRoom = catchAsyncErrors(
  async (req, res, next) => {
    let { roomId } = req.query;

    const bookings = await Booking.find({ room: roomId });

    let bookedDates = [];
    bookings.forEach((booking) => {
      const range = moment.range(
        moment(booking.checkInDate),
        moment(booking.checkOutDate)
      );

      const dates = Array.from(range.by('day'));
      bookedDates = bookedDates.concat(dates);
    });

    res.status(200).json({ success: true, bookedDates });
  }
);
