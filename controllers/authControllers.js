import {
  uploadToCloudinary,
  removeFromCloudinary,
} from '../utils/cloudinary.js';
import sendEmail from '../utils/sendEmail.js';
import absoluteUrl from 'next-absolute-url';

const User = require('../models/user.js');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors.js');
import crypto from 'crypto';

// register user => /api/auth/register
export const register = catchAsyncErrors(async (req, res, next) => {
  const result = await uploadToCloudinary(req.body.avatar, {
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
// TODO: make sure session is available on update page
export const updateProfile = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user?._id || '642aac05861cf5199d280e55');
  // const user = await User.findById('642aac05861cf5199d280e55');

  if (user) {
    user.name = req.body.name;
    user.email = req.body.email;
    if (req.body.password) user.password = req.body.password;
  }
  // update avatar
  if (req.body.avatar !== '') {
    // delete user previous image/avatar
    await removeFromCloudinary(user.avatar.public_id);

    const result = await uploadToCloudinary(req.body.avatar, {
      folder: 'bookify/avatars',
      width: '150',
      crop: 'scale',
    });

    user.avatar = {
      public_id: result.public_id,
      url: result.secure_url,
    };
  }
  await user.save();

  res.status(200).json({ success: true, user });
});

// forgot password => /api/password/forgot
export const forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler('User not found', 404));
  }

  // get reset token
  const resetToken = user.getPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // get origin
  const { origin } = absoluteUrl(req);

  // create passwort reset url
  const resetUrl = `${origin}/password/reset/${resetToken}`;

  const message = `Forgot your password? Click the URL below to reset \n\n${resetUrl} \n\nIf you haven't requested for this email, please ignore it.`;
  const html = `<p className='text-danger'>Forgot your password? Click the URL below to reset</p><p><a href="${resetUrl}">${resetUrl}</a></p><p>If you haven't requested for this email, please ignore it.</p>`;

  try {
    let data = await sendEmail({
      email: user.email,
      subject: 'Bookify Password Recovery',
      message,
      html,
    });
    res.status(200).json({
      success: true,
      data,
      message: `Password recovery email send to: ${user.email}`,
    });
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetExpire = undefined;
    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});

// reset password => /api/password/reset/:token
export const resetPassword = catchAsyncErrors(async (req, res, next) => {
  // hash url token
  const passwordResetToken = crypto
    .createHash('sha256')
    .update(req.query.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken,
    passwordResetExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler('password reset token is invalid or has expired', 404)
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler('password does not match', 404));
  }

  // setup the new password
  user.password = req.body.password;

  user.passwordResetToken = undefined;
  user.passwordResetExpire = undefined;

  await user.save();

  res.status(200).json({ success: true, message: 'password updated!' });
});

// get all users - ADMIN => /api/admin/users
export const allAdminUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find({});

  res.status(200).json({ success: true, users });
});

// get user details - ADMIN => /api/admin/users/:id
export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.query.id);
  if (!user) {
    return next(new ErrorHandler('User not found', 404));
  }

  res.status(200).json({ success: true, user });
});

// update user - ADMIN => /api/admin/users/:id
export const updateUser = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };
  const user = await User.findByIdAndUpdate(req.query.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({ success: true, user });
});

// delete user - ADMIN => /api/admin/users/:id
export const deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.query.id);
  if (!user) {
    return next(new ErrorHandler('User not found', 404));
  }

  // remove avatar
  await removeFromCloudinary(user.avatar.public_id);

  await user.remove();

  res.status(200).json({ success: true, user: null });
});
