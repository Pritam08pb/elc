import mongoose from "mongoose";
require("dotenv").config({ path: "config.env" });

const mongodbConnect = async () => {
  try {
    mongoose
      .connect(process.env.MONGODB_LINK)
      .then(console.log("Database Connected"));
  } catch (error) {
    Promise.reject(error);
  }
};

export default mongodbConnect;