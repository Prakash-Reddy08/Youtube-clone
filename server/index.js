import express from 'express'
import connectDB from './database/connectDB.js';

const app = express();
const PORT = 5000;
connectDB();


app.listen(PORT, () => {
    console.log("app running on port " + PORT);
})