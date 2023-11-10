// db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const dbUrl = "mongodb+srv://pritam123:pritam123@cluster0.lhvklnv.mongodb.net/ELC?retryWrites=true&w=majority"
    await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

module.exports = connectDB;




