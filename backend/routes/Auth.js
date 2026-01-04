import { Router } from 'express';
import {  loginUser, getUsers, registerUser, deleteUser, updateUser, logoutUser } from '../controllers/AuthController.js'
import { googleLogin } from '../controllers/googlelogin.js';

const authRouter = Router();

authRouter.get('/', getUsers);
authRouter.post('/login', loginUser);
authRouter.post('/register', registerUser);
authRouter.delete('/:id', deleteUser);
authRouter.put('/:id', updateUser);
authRouter.post("/logout", logoutUser);
authRouter.post("/google-login", googleLogin);


export default authRouter;