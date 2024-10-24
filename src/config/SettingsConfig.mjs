import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()
const MONGO_URL = process.env.APP_DB

const db = mongoose.connect(MONGO_URL, {
}).then(() => {
    console.log('Connected to Mongo');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});
mongoose.set('strictPopulate', false);

export default db