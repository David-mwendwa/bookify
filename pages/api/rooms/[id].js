import nc from 'next-connect';
import dbConnect from '../../../config/dbConnect';
import {
  getSingleRoom,
  updateRoom,
} from '../../../controllers/roomControllers';

const handler = nc();

dbConnect();

handler.get(getSingleRoom);

handler.patch(updateRoom);

export default handler;
