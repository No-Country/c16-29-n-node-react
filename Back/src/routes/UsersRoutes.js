import { Router } from "express";
import { verifyToken } from '../middlewares/auth.js';
import { createUsers, deleteUsers, getAllUsers, getAllUsersxRole, getUsers, updateUsers } from "../controllers/UsersController.js";

const UsersRouter = Router()

UsersRouter.get('/', getAllUsers)
UsersRouter.post('/role', getAllUsersxRole)
UsersRouter.get('/username', getUsers)
UsersRouter.post('/create', createUsers)
UsersRouter.put('/update', updateUsers)
UsersRouter.delete('/:id', deleteUsers)

export default UsersRouter