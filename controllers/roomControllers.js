const Room = require('../models/room.js');
const ErrorHandler = require('../utils/errorHandler');
const APIFeatures = require('../utils/apiFeatures.js');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors.js');

// get all rooms
export const allRooms = catchAsyncErrors(async (req, res, next) => {
  let resultsPerPage = 2;
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
    data: rooms,
  });
});

// create new room => /api/rooms
export const newRoom = catchAsyncErrors(async (req, res) => {
  const room = await Room.create(req.body);
  res.status(200).json({ success: true, data: room });
});

// get single room details => /api/rooms/:id
export const getSingleRoom = catchAsyncErrors(async (req, res, next) => {
  const room = await Room.findById(req.query.id);
  if (!room) {
    return next(new ErrorHandler('Room not found', 404));
  }
  res.status(200).json({ success: true, data: room });
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
  res.status(200).json({ success: true, data: room });
});

// delete room => /api/rooms/:id
export const deleteRoom = catchAsyncErrors(async (req, res, next) => {
  let room = await Room.findByIdAndRemove(req.query.id);
  if (!room) {
    return next(new ErrorHandler('Room not found', 404));
  }
  res.status(200).json({ success: true, message: 'Room is deleted' });
});
