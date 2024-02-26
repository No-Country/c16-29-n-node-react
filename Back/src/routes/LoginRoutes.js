import { Router } from "express";
import { login } from "../controllers/LoginController.js";
import ValidationsLogin from '../middlewares/validator.js'

const LoginRouter = Router()

LoginRouter.post('/', login);

export default LoginRouter