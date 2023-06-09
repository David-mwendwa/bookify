import nc from 'next-connect';
import dbConnect from '../../../config/dbConnect';
import {
  createRoomReview,
  deleteReview,
  getRoomReviews,
} from '../../../controllers/roomControllers';
import { isAuthenticatedUser } from '../../../middlewares/auth';

import onError from '../../../middlewares/errors';

const handler = nc({ onError });

dbConnect();

handler.use(isAuthenticatedUser).patch(createRoomReview);
handler.use(isAuthenticatedUser).get(getRoomReviews); //admin
handler.use(isAuthenticatedUser).delete(deleteReview); // admin

export default handler;
