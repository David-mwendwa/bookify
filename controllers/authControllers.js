import { uploadCloudinaryImage } from '../utils/cloudinary.js';

const User = require('../models/user.js');
const ErrorHandler = require('../utils/errorHandler');
const APIFeatures = require('../utils/apiFeatures.js');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors.js');

// register user => /api/auth/register
export const register = catchAsyncErrors(async (req, res, next) => {
  const result = await uploadCloudinaryImage(req, {
    folder: 'bookify/avatars',
    width: '150',
    crop: 'scale',
  });


  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: result.public_id,
      url: result.secure_url,
    },
  });

  res.status(200).json({ success: true, user });
});

// current user profile => /api/me
export const currentUserProfile = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  res.status(200).json({ success: true, user });
});

// update user profile => /api/me/update
export const updateProfile = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name;
    user.email = req.body.email;
    if (req.body.password) user.password = req.body.password;
  }
  // update avatar
  if (req.body.avatar !== '') {
    const public_id = user.avatar.public_id;
    // delete user previous image/avatar
    await cloudinary.v2.uploader.destroy(public_id);

    const result = await uploadCloudinaryImage(req, {
      folder: 'bookify/avatars',
      width: '150',
      crop: 'scale',
    });

    user.avatar = {
      public_id: result.public_id,
      url: result.secure_url,
    };
    await user.save();
  }

  res.status(200).json({ success: true, user });
});
