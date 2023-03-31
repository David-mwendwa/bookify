const Room = require('../models/room.js');
const mongoose = require('mongoose');
const rooms = require('../data/rooms.json');
const chalk = require('chalk');

const seedData = async (Model, data) => {
  try {
    await mongoose.connect(
      'mongodb+srv://techdave:TfvWue1TgXmqDYbS@cluster0.uxfwa3a.mongodb.net/bookify?retryWrites=true&w=majority'
    );
    await Model.deleteMany();
    console.log(chalk.bold.red('Initial data deleted'));
    await Model.insertMany(data);
    console.log(chalk.bold.green('New data added successfully'));
    process.exit(0);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};
seedData(Room, rooms);
