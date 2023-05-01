import mongoose from 'mongoose';
// import mongooseTimezone from 'mongoose-timezone';

const bookingSchema = new mongoose.Schema({
  room: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Room',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  checkInDate: {
    type: Date,
    required: true,
  },
  checkOutDate: {
    type: Date,
    required: true,
  },
  amountPaid: {
    type: Number,
    required: true,
  },
  daysOfStay: {
    type: Number,
    required: true,
  },
  paymentInfo: {
    id: { type: String },
    status: { type: String },
  },
  paidAt: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// bookingSchema.plugin(mongooseTimezone);

module.exports =
  mongoose.models.Booking || mongoose.model('Booking', bookingSchema);
