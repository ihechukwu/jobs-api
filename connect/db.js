const mongoose = require("mongoose");

const connectDB = async (uri) => {
  try {
    await mongoose.connect(uri).then(() => {
      console.log("connected to database!");
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
