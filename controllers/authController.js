const User = require('../models/User');
const { attachCookiesToResponse } = require('../utils');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError } = require('../errors');

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
  res.status(StatusCodes.OK).send('Login controller');
};
const logout = async (req, res) => {
  res.status(StatusCodes.OK).send('Logout controller');
};

module.exports = { register, login, logout };
