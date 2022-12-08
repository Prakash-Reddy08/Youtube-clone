import jwt from 'jsonwebtoken'
import env from 'dotenv'
import createError from '../error.js';
env.config();
export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) return next(createError(401, "You are not authenticated"))
    jwt.verify(
        token,
        process.env.ACCESSTOKEN_SECRET,
        (err, decoded) => {
            if (err) return next(createError(403, "Unauthorised"));//invalid token
            req.user = { id: decoded.id };
            next();
        }
    )
}