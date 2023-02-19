require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
// Database
const connectDb = require('./db/connect');
// Rest of packages
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
// Router
const authRouter = require('./routes/authRoutes');

// Middleware
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(morgan('tiny'));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

app.get('/', (req, res) => {
  res.status(200).json({ msg: 'Home page :)' });
});
app.get('/api/v1', (req, res) => {
  console.log(req.signedCookies);
  // console.log(req.cookies);
});
app.use('/api/v1/auth', authRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server is listening on port: ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
