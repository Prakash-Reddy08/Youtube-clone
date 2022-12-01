import mongoose from "mongoose";
import env from 'dotenv';
env.config();

const connectDB = () => {
    try {
        mongoose.connect(process.env.MONGODB_URL)
        console.log("connected to DB");
    } catch (error) {
        console.log(err);
        process.exit(1)
    }
}

export default connectDB