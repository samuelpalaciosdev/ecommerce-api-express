const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const connectDb = (url) => mongoose.connect(url);

module.exports = connectDb;
