const Room = require('../models/room.js');
const User = require('../models/user.js');
const Booking = require('../models/booking.js');
const ErrorHandler = require('../utils/errorHandler');
const APIFeatures = require('../utils/apiFeatures.js');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors.js');
import absoluteUrl from 'next-absolute-url';
import getRawBody from 'raw-body';

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

// Create new booking after payment => /api/webhook
export const webhookCheckout = catchAsyncErrors(async (req, res, next) => {
  try {
    const rawBody = await getRawBody(req);

    const signature = req.headers['stripe-signature'];
    const event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const room = session.client_reference_id;
      const user = (await User.findOne({ email: session.customer_email })).id;
      const amountPaid = session.amount_total / 100;
      const paymentInfo = {
        id: session.payment_intent,
        status: session.payment_status,
      };
      const checkInDate = session.metadata.checkInDate;
      const checkOutDate = session.metadata.checkOutDate;
      const daysOfStay = session.metadata.daysOfStay;

      const booking = await Booking.create({
        room,
        user,
        checkInDate,
        checkOutDate,
        daysOfStay,
        amountPaid,
        paymentInfo,
        paidAt: Date.now(),
      });
      console.log({ booking });
      res.status(200).json({ success: true, booking });
    }
  } catch (error) {
    console.log('Error in stripe checkout payment', error);
  }
});
