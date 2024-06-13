import express from 'express';
import { loginUser, registerUser, resetPassword, verifyUser, authFailure, authSuccess } from '../controllers/auth.controller';
import passport from 'passport';

const authRouter = express.Router();

authRouter.post('/', authSuccess);
authRouter.post('/login', loginUser);
authRouter.post('/register', registerUser);
authRouter.post('/reset-password/:id', resetPassword);
authRouter.post('/verify', verifyUser);
authRouter.get('/google', passport.authenticate('google', {
    scope: ['email', 'profile']
}));
authRouter.get('/google/callback', passport.authenticate('google', {
    failureRedirect: '/auth/failure',
    successRedirect: '/',
    session: true
}));
authRouter.get('/logout', (req : any, res : any) => {
    req.logout();
    res.json({isSuccess: true, message: 'User logged out successfully.'});
});
authRouter.get('/failure', authFailure);

export default authRouter;