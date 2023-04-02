const User = require('../models/user.js');
const ErrorHandler = require('../utils/errorHandler');
const APIFeatures = require('../utils/apiFeatures.js');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors.js');

// register user => /api/auth/register
export const register = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    // avatar: {
    //   public_id: 'public id',
    //   url: 'url',
    // },
  });

  res.status(200).json({ success: true, message: 'user registered', user });
});
