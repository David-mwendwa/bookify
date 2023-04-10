import absoluteUrl from 'next-absolute-url';

const Booking = require('../models/booking.js');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors.js');

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
    amountPaid: 90,
    paymentInfo,
  });

  res.status(200).json({ success: true, data: booking });
});
