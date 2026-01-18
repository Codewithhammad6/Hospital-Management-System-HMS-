import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectDB = async () => {
try {
const conn = await mongoose.connect(process.env.MONGO_URL);
console.log(`MongoDB connected: ${conn.connection.host}`);
} catch (error) {
    console.error('MongoDB connection error:', error);
}
}

export default connectDB;