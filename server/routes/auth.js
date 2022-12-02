import express from 'express'
import { signup, signin, googleAuth } from '../controllers/auth.js';

const router = express.Router();

router.post('/signup', signup)

router.post('/signin', signin)

//todo Google auth route
router.post('/google_Oauth', googleAuth)

export default router;