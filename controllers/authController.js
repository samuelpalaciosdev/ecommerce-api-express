const { BadRequestError } = require('../errors');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  const { name, email, password } = req.body;

  // ! Check if values are passed
  if (!name || !email || !password) {
    throw new BadRequestError('Please provide all fields');
  }

  // ! Check if email already exists
  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    throw new BadRequestError('Email already exists');
  }

  // * Set first registered user user as an admin
  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? 'admin' : 'user'; // If is the first account set role to admin

  const user = await User.create({ name, email, password, role });

  // * JWT Setup
  const tempUser = { name: user.name, userId: user._id, role: user.role };
  const token = jwt.sign(tempUser, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });

  res.status(200).json({ status: 'success', user: tempUser, token });
};
const login = async (req, res) => {
  res.status(200).send('Login controller');
};
const logout = async (req, res) => {
  res.status(200).send('Logout controller');
};

module.exports = { register, login, logout };
