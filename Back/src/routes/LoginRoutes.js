import { Router } from "express";
import { login } from "../controllers/LoginController.js";
import ValidationsLogin from "../middlewares/validator.js";
import { userLoginValidationsRules } from "../validations/login.validator.js";
import validate from "../validations/index.validator.js";

const LoginRouter = Router();

LoginRouter.post("/", userLoginValidationsRules(), validate, login);

export default LoginRouter;
