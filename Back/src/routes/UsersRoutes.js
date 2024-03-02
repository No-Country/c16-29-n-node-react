import { Router } from "express";
import { verifyToken } from "../middlewares/auth.js";
import {
  createUsers,
  deleteUsers,
  getAllUsers,
  getAllUsersxRole,
  getAllUsersxGrade,
  getAllUsersxNote,
  getUsers,
  updateUsers,
  createUsersSubject,
  createUsersSubjectTutor,
} from "../controllers/UsersController.js";
import validate from "../validations/index.validator.js";
import { userRegisterValidationRules } from "../validations/register.validator.js";
import { userLoginValidationsRules } from "../validations/login.validator.js";


const UsersRouter = Router();

UsersRouter.get("/", getAllUsers);
UsersRouter.get("/role", getAllUsersxRole);
UsersRouter.get("/grade", getAllUsersxGrade);
UsersRouter.get("/note", getAllUsersxNote);
UsersRouter.get("/username", getUsers);
UsersRouter.post(
  "/create",
  userRegisterValidationRules(),
  validate,
  createUsers
);
UsersRouter.put(
  "/update",
  userRegisterValidationRules(),
  validate,
  updateUsers
);
UsersRouter.post("/createusersubject", createUsersSubject);
UsersRouter.post("/createusersubjecttutor", createUsersSubjectTutor);
UsersRouter.put( "/updateusersubject", updateUsers);
UsersRouter.delete("/:id", deleteUsers);

export default UsersRouter;
