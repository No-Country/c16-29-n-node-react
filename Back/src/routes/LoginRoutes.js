import { Router } from "express";
import { register, login } from "../controllers/LoginController.js";
import { verifyToken } from '../middlewares/auth.js';

const LoginRouter = Router()

//LoginRouter.get('/:id', getPers)

console.log(LoginRouter)
LoginRouter.post('/entry',login);
LoginRouter.post('/register', register);
LoginRouter.get('/welcome', verifyToken, (req, res) => {
        res.status(200).send("Bienvenido a Programación en Español!");
    })

export default LoginRouter