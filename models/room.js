const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter room name'],
      trim: true,
      unique: true,
    },
    pricePerNight: {
      type: Number,
      required: [true, 'Please enter room price'],
      default: 0.0,
    },
    description: {
      type: String,
      required: [true, 'Please enter room description'],
      trim: true,
    },
    address: {
      type: String,
      required: [true, 'Please enter room address'],
    },
    guestCapacity: {
      type: String,
      required: [true, 'Please enter room guest capacity'],
    },
    numOfBeds: {
      type: Number,
      required: [true, 'Please enter number of beds in the room'],
    },
    internet: {
      type: Boolean,
      default: false,
    },
    breakfast: {
      type: Boolean,
      default: false,
    },
    airConditioned: {
      type: Boolean,
      default: false,
    },
    petsAllowed: {
      type: Boolean,
      default: false,
    },
    roomCleaning: {
      type: Boolean,
      default: false,
    },
    ratings: {
      type: Number,
      default: 0,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    category: {
      type: String,
      required: [true, 'Please enter room category'],
      enum: {
        values: ['King', 'Single', 'Twins'],
        message: 'Please select correct category for room',
      },
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.ObjectId,
          ref: 'User',
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        rating: {
          type: Number,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
      },
    ],
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Room || mongoose.model('Room', roomSchema);
