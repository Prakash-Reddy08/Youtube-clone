import express from 'express'
import connectDB from './database/connectDB.js';
import userRoutes from "./routes/users.js"
import videoRoutes from "./routes/videos.js"
import commentRoutes from "./routes/comments.js"
import authRoute from "./routes/auth.js"
import cookieParser from 'cookie-parser'
import cors from 'cors'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = 5000;
connectDB();

app.use(cors({
    origin: [process.env.CLIENT_URL || 'http://localhost:3000'],
    credentials: true
}));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(path.join(__dirname, 'public')))
app.use(cookieParser())
app.use("/api/auth", authRoute)
app.use("/api/users", userRoutes)
app.use("/api/videos", videoRoutes)
app.use("/api/comments", commentRoutes)
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'Something went wrong'
    return res.status(status).json({
        sucess: false,
        status,
        message
    })
})
app.listen(PORT, () => {
    console.log("app running on port " + PORT);
})