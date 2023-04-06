const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter your name'],
      maxLength: [50, 'Your name cannot exceed 50 characters'],
    },
    email: {
      type: String,
      required: [true, 'Please enter your email'],
      unique: true,
      validate: [validator.isEmail, 'Please enter a valid email address'],
    },
    password: {
      type: String,
      required: [true, 'Please enter your password'],
      minLength: [6, 'Your password must be longer than 6 chassssracters'],
      select: false,
    },
    avatar: {
      public_id: {
        type: String,
        required: true,
        default: `avatar_${Date.now()}`,
      },
      url: {
        type: String,
        required: true,
        default:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUJt3kjJp8q750SzS-kr7cMITugGpEh-Vdq0NeWS4&s',
      },
    },
    role: {
      type: String,
      default: 'user',
    },
    passwordResetToken: String,
    passwordResetExpire: Date,
  },
  { timestamps: true }
);

// encrypt password before save
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) next();
  this.password = await bcrypt.hash(this.password, 10);
});

// compare user password
userSchema.methods.comparePassword = async function (inputPassword) {
  return await bcrypt.compare(inputPassword, this.password);
};

userSchema.methods.getPasswordResetToken = function () {
  // generate token
  const resetToken = crypto.randomBytes(10).toString('hex');
  console.log({resetToken});

  // hash and set to passwordResetToken
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // set token expiry time
  let duration = 30 * 60 * 1000; // 30 minutes
  this.passwordResetExpire = Date.now() + duration;
  return resetToken;
};

module.exports = mongoose.models?.User || mongoose.model('User', userSchema);
