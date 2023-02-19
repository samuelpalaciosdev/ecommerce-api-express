const { BadRequestError } = require('../errors');
const User = require('../models/User');

const register = async (req, res) => {
  const { name, email, password } = req.body;

  // ! Check if values are passed
  if (!name || !email || !password) {
    throw new BadRequestError('Please provide all fields');
  }

  // ! Check if email already exists
  const emailAlreadyExists = await User.find({ email });
  if (emailAlreadyExists) {
    throw new BadRequestError('Email already exists');
  }

  const user = await User.create({ ...req.body });

  res.status(200).json({ status: 'success', user });
};
const login = async (req, res) => {
  res.status(200).send('Login controller');
};
const logout = async (req, res) => {
  res.status(200).send('Logout controller');
};

module.exports = { register, login, logout };
