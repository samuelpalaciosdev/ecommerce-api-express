const User = require('../models/User');
const { attachCookiesToResponse, isTokenValid } = require('../utils');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError } = require('../errors');

const register = async (req, res) => {
  const { name, email, password } = req.body;

  // ! Check if all values are passed
  if (!name || !email || !password) {
    throw new BadRequestError('Please provide all fields');
  }

  // ! Check if email already exists
  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    throw new BadRequestError('Email already exists');
  }
  // * Set first registered user as admin
  const isFirstAccount = (await User.countDocuments({})) === 0; // If there's no other user registered
  const role = isFirstAccount ? 'admin' : 'user';

  // * Create user
  const user = await User.create({ name, email, password, role });

  // * JWT Setup
  const tokenUser = { name: user.name, userId: user._id, role: user.role };
  attachCookiesToResponse({ res, user: tokenUser });

  res.status(StatusCodes.CREATED).json({ status: 'success', user: tokenUser });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  // ! Check if all values are passed
  if (!email || !password) {
    throw new BadRequestError('Please provide all fields');
  }

  const user = await User.findOne({ email });

  // ! Check if user doesn't exist
  if (!user) {
    throw new UnauthenticatedError('Invalid credentials');
  }

  // ! Check Password
  const isPasswordCorrect = await user.checkPassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid credentials');
  }

  // * If user exists, send JWT cookie
  const tokenUser = { name: user.name, userId: user._id, role: user.role };
  attachCookiesToResponse({ res, user: tokenUser });

  res.status(StatusCodes.CREATED).json({ status: 'success', user: tokenUser });
};

const logout = async (req, res) => {
  res.status(StatusCodes.OK).send('Logout controller');
};

module.exports = { register, login, logout };
