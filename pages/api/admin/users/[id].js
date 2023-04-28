import nc from 'next-connect';
import dbConnect from '../../../../config/dbConnect';

import onError from '../../../../middlewares/errors';
import {
  isAuthenticatedUser,
  authorizeRoles,
} from '../../../../middlewares/auth';
import {
  getUserDetails,
  updateUser,
} from '../../../../controllers/authControllers';

const handler = nc({ onError });

dbConnect();

handler.use(isAuthenticatedUser, authorizeRoles('admin')).get(getUserDetails);
handler.use(isAuthenticatedUser, authorizeRoles('admin')).patch(updateUser);

export default handler;
