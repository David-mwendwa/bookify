const User = require('../models/user.js');
// const cloudinary = require('cloudinary');
const ErrorHandler = require('../utils/errorHandler');
const APIFeatures = require('../utils/apiFeatures.js');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors.js');

// setting up cloudinary config
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// register user => /api/auth/register
export const register = catchAsyncErrors(async (req, res, next) => {
  // const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
  //   folder: 'bookify/avatars',
  //   width: '150',
  //   crop: 'scale',
  // });

  // console.log({ result });

  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "result.public_id",
      url: "result.secure_url",
    },
  });

  res.status(200).json({ success: true, message: 'user registered', user });
});
