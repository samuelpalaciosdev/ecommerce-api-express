const jwt = require('jsonwebtoken');

const createJWT = ({ payload }) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
  return token;
};

const isTokenValid = ({ token }) => jwt.verify(token, process.env.JWT_SECRET);

const attachCookiesToResponse = ({ res, user }) => {
  // * Create token
  const token = createJWT({ payload: user });
  // * Sending token as cookie
  const oneDay = 1000 * 60 * 60 * 24; // 24hrs in ms
  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay), // Token expires in one day
    secure: process.env.NODE_ENV === 'production', // Send cookie only over HTTPS in production env
    signed: true,
  });
};

module.exports = { createJWT, isTokenValid, attachCookiesToResponse };
