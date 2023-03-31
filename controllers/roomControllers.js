const Room = require('../models/room.js');

const ErrorHandler = require('../utils/errorHandler');

// get all rooms
export const allRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    res.status(200).json({ success: true, count: rooms.length, data: rooms });
  } catch (error) {
    return next(new ErrorHandler(error.message, 404));
  }
};

// create new room => /api/rooms
export const newRoom = async (req, res) => {
  try {
    const room = await Room.create(req.body);
    res.status(200).json({ success: true, data: room });
  } catch (error) {
    return next(new ErrorHandler(error.message, 404));
  }
};

// get single room details => /api/rooms/:id
export const getSingleRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.query.id);
    if (!room) {
      return next(new ErrorHandler('Room not found', 404));
    }
    res.status(200).json({ success: true, data: room });
  } catch (error) {
    return next(new ErrorHandler(error.message, 404));
  }
};

// update room details => /api/rooms/:id
export const updateRoom = async (req, res, next) => {
  try {
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
  } catch (error) {
    return next(new ErrorHandler(error.message, 404));
  }
};

// delete room => /api/rooms/:id
export const deleteRoom = async (req, res, next) => {
  try {
    let room = await Room.findByIdAndRemove(req.query.id);
    if (!room) {
      return next(new ErrorHandler('Room not found', 404));
    }
    res.status(200).json({ success: true, message: 'Room is deleted' });
  } catch (error) {
    return next(new ErrorHandler(error.message, 404));
  }
};
