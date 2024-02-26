import { Router } from "express";
import { verifyToken } from '../middlewares/auth.js';
import { createUsers, deleteUsers, getAllUsers, getAllUsersxRole, getAllUsersxGrade, getUsers, updateUsers } from "../controllers/UsersController.js";

const UsersRouter = Router()

UsersRouter.get('/', getAllUsers)
UsersRouter.get('/role', getAllUsersxRole)
UsersRouter.get('/grade', getAllUsersxGrade)
UsersRouter.get('/username', getUsers)
UsersRouter.post('/create', createUsers)
UsersRouter.put('/update', updateUsers)
UsersRouter.delete('/:id', deleteUsers)

export default UsersRouter