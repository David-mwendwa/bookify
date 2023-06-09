import nc from 'next-connect';
import dbConnect from '../../../../config/dbConnect';

import onError from '../../../../middlewares/errors';
import {
  isAuthenticatedUser,
  authorizeRoles,
} from '../../../../middlewares/auth';
import { allAdminBookings } from '../../../../controllers/bookingControllers';

const handler = nc({ onError });

dbConnect();

handler.use(isAuthenticatedUser, authorizeRoles('admin')).get(allAdminBookings);

export default handler;
