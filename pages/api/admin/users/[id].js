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
  deleteUser,
} from '../../../../controllers/authControllers';

const handler = nc({ onError });

dbConnect();

// handler.use(isAuthenticatedUser, authorizeRoles('admin')).get(getUserDetails);
// handler.use(isAuthenticatedUser, authorizeRoles('admin')).patch(updateUser);

handler.get(getUserDetails);
handler.patch(updateUser);
handler.delete(deleteUser);

export default handler;
