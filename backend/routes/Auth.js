import { Router } from 'express';
import {  loginUser, getUsers, registerUser, deleteUser, updateUser, logoutUser, sendOtp, verifyOtp } from '../controllers/AuthController.js'
import { googleLogin } from '../controllers/googlelogin.js';

const authRouter = Router();

authRouter.get('/', getUsers);
authRouter.post('/login', loginUser);
authRouter.post('/register', registerUser);
authRouter.post('/send-otp', sendOtp);
authRouter.post('/verify-otp', verifyOtp);
authRouter.delete('/:id', deleteUser);
authRouter.put('/:id', updateUser);
authRouter.post("/logout", logoutUser);
authRouter.post("/google-login", googleLogin);


export default authRouter;