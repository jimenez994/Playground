import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const DATABASE_URL = process.env.MONGO_URL

const connectDB = async () => {
  try {
    await mongoose.connect(DATABASE_URL)
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

export default connectDB;