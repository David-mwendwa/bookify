import Room from '../models/room';

export const allRooms = (req, res) => {
  res.status(200).json({
    success: true,
    message: 'All Rooms',
  });
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
