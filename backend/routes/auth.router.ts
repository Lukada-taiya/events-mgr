import express from 'express';
import { loginUser, registerUser, resetPassword, verifyUser } from '../controllers/auth.controller';

const authRouter = express.Router();

authRouter.post('/login', loginUser)
authRouter.post('/register', registerUser)
authRouter.post('/reset-password/:id', resetPassword)
authRouter.post('/verify', verifyUser)

export default authRouter;