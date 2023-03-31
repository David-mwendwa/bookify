const Room = require('../models/room.js');

// get all rooms
export const allRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json({ success: true, count: rooms.length, data: rooms });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// create new room => /api/rooms
export const newRoom = async (req, res) => {
  try {
    const room = await Room.create(req.body);
    res.status(200).json({ success: true, data: room });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// get single room details => /api/rooms/:id
export const getSingleRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.query.id);
    if (!room) {
      return res.status(400).json({ success: false, error: 'Room not found' });
    }
    res.status(200).json({ success: true, data: room });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// update room details => /api/rooms/:id
export const updateRoom = async (req, res) => {
  try {
    let room = await Room.findById(req.query.id);
    if (!room) {
      return res.status(400).json({ success: false, error: 'Room not found' });
    }
    room = await Room.findByIdAndUpdate(req.query.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    res.status(200).json({ success: true, data: room });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// delete room => /api/rooms/:id
export const deleteRoom = async (req, res) => {
  try {
    let room = await Room.findByIdAndRemove(req.query.id);
    if (!room) {
      return res.status(400).json({ success: false, error: 'Room not found' });
    }
    res.status(200).json({ success: true, message: 'Room is deleted' });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
