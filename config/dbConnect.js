const mongoose = require('mongoose');

const dbConnect = () => {
  if (mongoose.connection.readyState > 1) return;
  mongoose
    .connect(process.env.MONGO_URI)
    .then((con) => console.log('Connected to mongoDB'))
    .catch((err) => console.log('Could not connect to mongoDB', err));
};

module.exports = dbConnect;
