import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

/**
 * @description Auth user & get token
 * @route       POST /api/user/login
 * @access      Public
 */
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

/**
 * @description Get user profile
 * @route       GET /api/user/profile
 * @access      Private
 */
const getUserProfile = asyncHandler(async (req, res) => {
  const { user } = req;

  if (user) {
    res.json({
      _id: user._id,
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

/**
 * @description Register user
 * @route       POST /api/user/register
 * @access      Public
 */
const registerUser = asyncHandler(async (req, res) => {
  const { email, password, name } = req.body;

  if (await User.findOne({ email })) {
    res.status(404);
    throw new Error('Email is registered');
  }

  const user = await User.create({ email, password, name });

  if (user) {
    res.status(201);
    res.json({
      _id: user._id,
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

/**
 * @description Update user profile
 * @route       PUT /api/user/profile
 * @access      Private
 */
const updateUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.findById(req.user._id);

  if (user) {
    user.name = name ?? user.name;
    user.email = email ?? user.email;
    if (password) {
      user.password = password ?? user.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      email: updatedUser.email,
      name: updatedUser.name,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export { authUser, getUserProfile, registerUser, updateUser };
