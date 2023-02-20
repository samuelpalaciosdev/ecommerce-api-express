const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const { NotFoundError } = require('../errors');

const getAllUsers = async (req, res) => {
  // * Get all users with roler user and exclude password
  const users = await User.find({ role: 'user' }).select('-password');
  res.status(StatusCodes.OK).json({ users });
};

const getSingleUser = async (req, res) => {
  // * Get userById and exclude password
  const user = await User.findOne({ _id: req.params.id }).select('-password');

  // ! If user not found
  if (!user) {
    throw new NotFoundError(`No user with id: ${req.params.id}`);
  }
  res.status(StatusCodes.OK).json({ user });
};

const showCurrentUser = async (req, res) => {
  res.status(StatusCodes.OK).send('Show current user');
};

const updateUser = async (req, res) => {
  res.status(StatusCodes.OK).send('Update user');
};

const updateUserPassword = async (req, res) => {
  res.status(StatusCodes.OK).send('Update user password');
};

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
};
