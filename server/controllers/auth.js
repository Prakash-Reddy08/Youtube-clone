import User from "../database/models/User.js";
import bcrypt from 'bcrypt'
import createError from '../error.js'
import jwt from 'jsonwebtoken'
import env from 'dotenv'
env.config();
const ACCESS_TOKEN_EXPIRE_TIME = 300;
const REFRESH_TOKEN_EXPIRE_TIME = '1d'
export const signup = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const userExist = await User.findOne({ name });
        if (email === '' || name === '' || password === '') {
            next(createError(400, "Uhh.. really"))
            return;
        }
        if (password.length < 8) {
            next(createError(400, "Password must be minimum of length 8"))
            return;
        }
        if (name.length < 3) {
            next(createError(400, "Username must be atleast of 3 characters"))
            return;
        }
        if (userExist) {
            next(createError(401, "Username already exist"))
            return;
        }
        const emailExist = await User.findOne({ email });
        if (emailExist) {
            next(createError(401, "Email already exist"))
            return;
        }
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt);
        await User.create({ name, email, password: hashPassword })
        res.json({ message: "Account created successfully", sucess: true }).status(200)
    } catch (error) {
        next(createError(500, "Something went wrong"));
    }
}
export const signin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const foundUser = await User.findOne({ email })
        if (!foundUser) {
            return next(createError(404, 'User not found!'))
        }
        const isPasswordCorrect = bcrypt.compare(password, foundUser.password)
        if (!isPasswordCorrect) {
            return next(createError(400, "Incorrect Email or Password"))
        }
        const accessToken = jwt.sign({ id: foundUser._id }, process.env.ACCESSTOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRE_TIME })
        const refreshToken = jwt.sign({ id: foundUser._id }, process.env.REFRESHTOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRE_TIME })
        await User.findOneAndUpdate({ _id: foundUser._id },
            { refreshToken }
        )
        const { password: psw, ...otherDetails } = foundUser._doc;
        res.cookie('refresh_token', refreshToken, { httpOnly: true, sameSite: 'none', secure: true, maxAge: 24 * 60 * 60 * 1000 })
        res.json({ accessToken, ...otherDetails })
    } catch (error) {
        next(createError(500, error.message));
    }
}
export const googleAuth = async (req, res) => {

}