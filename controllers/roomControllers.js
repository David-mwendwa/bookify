import { uploadToCloudinary } from '../utils/cloudinary.js';

const Room = require('../models/room.js');
const Booking = require('../models/booking.js');
const ErrorHandler = require('../utils/errorHandler');
const APIFeatures = require('../utils/apiFeatures.js');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors.js');

// get all rooms
export const allRooms = catchAsyncErrors(async (req, res, next) => {
  let resultsPerPage = 4;
  const roomsCount = await Room.countDocuments();

  const apiFeatures = new APIFeatures(Room.find(), req.query).search().filter();

  let rooms = await apiFeatures.query;
  let filteredRoomsCount = rooms.length;

  apiFeatures.pagination(resultsPerPage);
  rooms = await apiFeatures.query.clone();

  res.status(200).json({
    success: true,
    roomsCount,
    resultsPerPage,
    filteredRoomsCount,
    rooms,
  });
});

// create new room => /api/rooms
export const newRoom = catchAsyncErrors(async (req, res) => {
  const images = req.body.images;
  let imagesLinks = [];
  for (let i = 0; i < images.length; i++) {
    const result = await uploadToCloudinary(images[i], {
      folder: 'bookify/rooms',
      width: '400',
      crop: 'scale',
    });
    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }
  req.body.images = imagesLinks;
  req.body.user = req.user?._id || '642aac05861cf5199d280e55';
  const room = await Room.create(req.body);
  res.status(200).json({ success: true, room });
});

// get single room details => /api/rooms/:id
export const getSingleRoom = catchAsyncErrors(async (req, res, next) => {
  const room = await Room.findById(req.query.id);
  if (!room) {
    return next(new ErrorHandler('Room not found', 404));
  }
  res.status(200).json({ success: true, room });
});

// update room details => /api/rooms/:id
export const updateRoom = catchAsyncErrors(async (req, res, next) => {
  let room = await Room.findById(req.query.id);
  if (!room) {
    return next(new ErrorHandler('Room not found', 404));
  }
  room = await Room.findByIdAndUpdate(req.query.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({ success: true, room });
});

// delete room => /api/rooms/:id
export const deleteRoom = catchAsyncErrors(async (req, res, next) => {
  let room = await Room.findByIdAndRemove(req.query.id);
  if (!room) {
    return next(new ErrorHandler('Room not found', 404));
  }
  res.status(200).json({ success: true, message: 'Room is deleted' });
});

// create a new review => /api/reviews
export const createRoomReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, roomId } = req.body;

  const review = {
    user: req.user?._id.toString() || '642aac05861cf5199d280e55',
    name: req.user?.name || 'David',
    rating: Number(rating),
    comment,
  };

  const room = await Room.findById(roomId);
  const isReviewed = room.reviews.find(
    (r) =>
      r.user.toString() ===
      (req.user?._id.toString() || '642aac05861cf5199d280e55')
  );
  if (isReviewed) {
    room.reviews.forEach((review) => {
      if (
        review.user.toString() ===
        (req.user?._id.toString() || '642aac05861cf5199d280e55')
      ) {
        review.comment = comment;
        review.rating = rating;
      }
    });
  } else {
    room.reviews.push(review);
    room.numOfReviews = room.reviews.length;
  }
  room.rating =
    room.reviews.reduce((acc, item) => item.rating + acc, 0) /
    room.reviews.length;

  await room.save({ validateBeforeSave: false });

  res.status(200).json({ success: true });
});

// check review availability => /api/reviews/check_review_availablity
export const checkReviewAvailability = catchAsyncErrors(
  async (req, res, next) => {
    const { roomId } = req.query;
    const bookings = await Booking.find({
      user: req.user?._id || '642aac05861cf5199d280e55',
      room: roomId,
    });

    let isReviewAvailable = false;
    if (bookings.length > 0) isReviewAvailable = true;

    res.status(200).json({ success: true, isReviewAvailable });
  }
);

// Get all romms - ADMIN => /api/admin/rooms
export const allAdminRooms = catchAsyncErrors(async (req, res, next) => {
  const rooms = await Room.find();

  res.status(200).json({ success: true, rooms });
});
