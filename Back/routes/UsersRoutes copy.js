import { Router } from "express";
import { verifyToken } from '../middlewares/auth.js';
import { createUsers, deleteUsers, getAllUsers, getUsers, updateUsers } from "../controllers/BannsController.js";

const UsersRouter = Router()

UsersRouter.get('/', verifyToken, getAllUsers)
UsersRouter.get('/:id', verifyToken, getUsers)
UsersRouter.post('/', verifyToken, createUsers)
UsersRouter.put('/:id', verifyToken, updateUsers)
UsersRouter.delete('/:id', verifyToken, deleteUsers)

export default UsersRouter