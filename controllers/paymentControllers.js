const Room = require('../models/room.js');
const User = require('../models/user.js');
const Booking = require('../models/booking.js');
const ErrorHandler = require('../utils/errorHandler');
const APIFeatures = require('../utils/apiFeatures.js');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors.js');
import absoluteUrl from 'next-absolute-url';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Generate stripe checkout session
export const stripeCheckoutSession = catchAsyncErrors(
  async (req, res, next) => {
    // get room details
    const room = await Room.findById(req.query.roomId);

    const { checkInDate, checkOutDate, daysOfStay } = req.query;

    // get origin
    const { origin } = absoluteUrl(req);

    // create stripe checkout session => /api/checkout_session/:roomId
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      success_url: `${origin}/bookings/me`,
      cancel_url: `${origin}/room/${room._id}`,
      customer_email: req.user.email,
      client_reference_id: req.query.roomId,
      metadata: { checkInDate, checkOutDate, daysOfStay },
      mode: 'payment',
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: 'usd',
            unit_amount: req.query.amount * 100,
            product_data: {
              name: room.name,
              images: [`${room.images[0].url}`],
            },
          },
        },
      ],
    });

    res.status(200).json(session);
  }
);
