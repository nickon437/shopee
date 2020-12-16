import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

/**
 * @description Auth user & get token
 * @route       POST /api/user/login
 * @access      Public
 */
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    return res.json({
      _id: user._id,
      email: user.email,
      name: user.password,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

export { authUser };
