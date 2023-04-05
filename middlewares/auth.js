const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors.js');

// const { getSession } = require('next-auth/client');
import { getSession } from 'next-auth/react';

const isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const session = await getSession({ req });
  console.log({ session });
  if (!session) {
    return next(new ErrorHandler('Login first to access this resource', 401));
  }

  req.user = session.user;
  next();
});

module.exports = isAuthenticatedUser;
