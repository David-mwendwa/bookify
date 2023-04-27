const Booking = require('../models/booking.js');
const Room = require('../models/room.js');
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

    const timeDifference = moment().utcOffset() / 60;
    console.log({ timeDifference });

    bookings.forEach((booking) => {
      const checkInDate = moment(booking.checkInDate).add(
        timeDifference,
        'hours'
      );
      const checkOutDate = moment(booking.checkOutDate).add(
        timeDifference,
        'hours'
      );
      const range = moment.range(moment(checkInDate), moment(checkOutDate));

      const dates = Array.from(range.by('day'));
      bookedDates = bookedDates.concat(dates);
    });

    res.status(200).json({ success: true, bookedDates });
  }
);

// get all bookings of current user => /api/bookings/me
export const myBookings = catchAsyncErrors(async (req, res, next) => {
  let bookings = await Booking.find({ user: req.user._id }).populate([
    { path: 'room', select: 'name pricePerNight images' },
    { path: 'user', select: 'name email' },
  ]);

  res.status(200).json({ success: true, bookings });
});

// get booking details => /api/bookings/:id
export const getBookingDetails = catchAsyncErrors(async (req, res, next) => {
  let bookings = await Booking.findById(req.query.id).populate([
    { path: 'room', select: 'name pricePerNight images' },
    { path: 'user', select: 'name email' },
  ]);

  res.status(200).json({ success: true, bookings });
});

// get all bookings - ADMIN => /api/admin/bookings
export const allAdminBookings = catchAsyncErrors(async (req, res, next) => {
  let bookings = await Booking.find().populate([
    { path: 'room', select: 'name pricePerNight images' },
    { path: 'user', select: 'name email' },
  ]);

  res.status(200).json({ success: true, bookings });
});

// delete booking - ADMIN => /api/admin/bookings
export const deleteBooking = catchAsyncErrors(async (req, res, next) => {
  let booking = await Booking.findByIdAndRemove(req.query.id);

  if (!booking) {
    return next(new ErrorHandler('Booking not found', 404));
  }

  res.status(200).json({ success: true });
});
