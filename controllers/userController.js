const { StatusCodes } = require('http-status-codes');

const getAllUsers = async (req, res) => {
  res.status(StatusCodes.OK).send('Get all users');
};

const getSingleUser = async (req, res) => {
  res.status(StatusCodes.OK).send('Get single user');
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
