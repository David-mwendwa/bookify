import nc from 'next-connect';
import dbConnect from '../../../config/dbConnect';
import { checkReviewAvailability } from '../../../controllers/roomControllers';
import { isAuthenticatedUser } from '../../../middlewares/auth';

import onError from '../../../middlewares/errors';

const handler = nc({ onError });

dbConnect();

handler.use(isAuthenticatedUser).get(checkReviewAvailability);
// handler.patch(checkReviewAvailability);

export default handler;
