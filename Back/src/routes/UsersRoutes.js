import { Router } from "express";
import { verifyToken } from '../middlewares/auth.js';
import { createUsers, deleteUsers, getAllUsers, getAllUsersxRole, getAllUsersxGrade, getUsers, updateUsers } from "../controllers/UsersController.js";
import validate from "../validations/index.validator.js";
import { userRegisterValidationRules } from "../validations/register.validator.js";
import { userLoginValidationsRules } from "../validations/login.validator.js";

const UsersRouter = Router()

UsersRouter.get('/', getAllUsers)
UsersRouter.get('/role', getAllUsersxRole)
UsersRouter.get('/grade', getAllUsersxGrade)
UsersRouter.get('/username', getUsers)
UsersRouter.post('/create', userRegisterValidationRules(), validate, createUsers)
UsersRouter.put('/update', userRegisterValidationRules(), validate ,updateUsers)
UsersRouter.delete('/:id', deleteUsers)

export default UsersRouter