import jwt from 'jsonwebtoken'
import env from 'dotenv'
import createError from '../error.js';
env.config();
export const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    if (!authHeader) return next(createError(401, "You are not authenticated"))
    const token = authHeader.split(' ')[1]
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