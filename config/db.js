const mongoose = require("mongoose");
const colors = require("colors");
//function mongodb database connection

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(
      `Database Connected: ${mongoose.connection.host}`.bgCyan,
      colors.bgCyan
    );
  } catch (error) {
    console.log("DB ERROR", error);
  }
};

module.exports = connectDb;
