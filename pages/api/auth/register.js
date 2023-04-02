import nc from 'next-connect';
import dbConnect from '../../../config/dbConnect';
import { register } from '../../../controllers/authControllers';

import onError from '../../../middlewares/errors';

const handler = nc({ onError });

dbConnect();

handler.post(register);

export default handler;
