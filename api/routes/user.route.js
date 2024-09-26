import express from 'express';
import UserController from '../controllers/user.controller.js';

const userRoutes = express.Router();

userRoutes.post('/login', UserController.login);
userRoutes.post('/register', UserController.register);

export default userRoutes;
