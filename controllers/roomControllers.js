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
