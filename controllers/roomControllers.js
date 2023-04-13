const Room = require('../models/room.js');
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

// create a new review => /api/review
export const createRoomReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, roomId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const room = await Room.findById(roomId);
  const isReviewed = room.reviews.find(
    (r) => r.user.toString() === req.user._id.toString()
  );
  if (isReviewed) {
    room.reviews.forEach((review) => {
      if (review.user.toString() === req.user._id.toString()) {
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
