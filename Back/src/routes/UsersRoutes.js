import { Router } from "express";
import { verifyToken } from "../middlewares/auth.js";
import {
  createUsers,
  deleteUsers,
  getAllUsers,
  getAllUsersxRole,
  getAllStudentsByGrade,
  updateUsersSubject,
} from "../controllers/UsersController.js";
import validate from "../validations/index.validator.js";
import { userRegisterValidationRules, userUpdateValidationRules } from "../validations/register.validator.js";
import { userLoginValidationsRules } from "../validations/login.validator.js";

const UsersRouter = Router();

UsersRouter.get("/", getAllUsers);
UsersRouter.get("/grade/:grade", getAllStudentsByGrade);
UsersRouter.post("/role", getAllUsersxRole);
UsersRouter.post(
  "/",
  userRegisterValidationRules(),
  validate,
  createUsers
);
UsersRouter.put(
  "/:id",
  userUpdateValidationRules(),
  validate,
  updateUsersSubject
);
UsersRouter.delete("/:id", deleteUsers);

export default UsersRouter;
