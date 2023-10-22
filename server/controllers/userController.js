import asyncHandler from 'express-async-handler';
import User from '../models/userModels.js';
import generateToken from '../utils/generateToken.js';

// @desc Auth user/set Token
// routes POST /api/users/auth
// access Public
const authUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id); // Generate and set a JSON Web Token
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc Register a new user
// routes POST /api/users
// access Public
const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error('User already exists');
  }

  const newUser = await User.create({
    name: name,
    email: email,
    password: password
  });

  if (newUser) {
    generateToken(res, newUser._id); // Generate and set a JSON Web Token
    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email
    });
  } else {
    res.status(400);
    throw new Error('Something went wrong. Please try again.');
  }
});

// @desc Logout
// routes POST /api/users/logout
// access Public
const logoutUser = asyncHandler(async (req, res, next) => {
  // Clear the JWT cookie to log the user out
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0)
  });
  res.status(200).json({
    message: 'User Logged Out'
  });
});

// @desc get user Profile
// routes POST /api/users/profile
// access Private
const getUserProfile = asyncHandler(async (req, res, next) => {

  console.log(req.user)

  const user = {
    _id: req.user._id,
    name: req.user.name,
    email : req.user.email
  }

  res.status(200).json({user});
});

// @desc update user profile
// routes PUT /api/users/auth
// access Private
const updateUserProfile = asyncHandler(async (req, res, next) => {

  const user = await User.findById(req.user._id)

  if(user){
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    const updatedUser = await user.save();

    res.status(200).json({
      _id:updatedUser._id,
      name:updatedUser.name,
      email:updatedUser.email
    })

  }else{
    res.status(404);
    throw new Error("Unauthorized, User not found");
  }

  res.status(200).json({
    message: 'Update user profile'
  });
});

// Export the route handlers
export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile
};
