import nc from 'next-connect';
import dbConnect from '../../../config/dbConnect';
import { updateProfile } from '../../../controllers/authControllers';

import onError from '../../../middlewares/errors';
import { isAuthenticatedUser } from '../../../middlewares/auth';

const handler = nc({ onError });

dbConnect();

// handler.use(isAuthenticatedUser).patch(updateProfile);
handler.patch(updateProfile);

export default handler;
