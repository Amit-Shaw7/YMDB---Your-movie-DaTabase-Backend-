import express from "express";
import { isLoggedIn, login, register } from "../controllers/AuthController.js";
import { verifyToken } from "../verifyToken.js";
const AuthRouter = express.Router();

AuthRouter.route('/register')
    .post(register)

AuthRouter.route('/login')
    .post(login)
AuthRouter.route('/getUser')
    .get(verifyToken , isLoggedIn)


export default AuthRouter;