import { Router } from "express";
import {
  createUsers,
  deleteUsers,
  getAllUsers,
  getAllUsersxRole,
  getAllStudentsByGrade,
  updateUsersSubject,
} from "../controllers/UsersController.js";
import {
  verifyTokenIsValid
} from "../controllers/LoginController.js";
import validate from "../validations/index.validator.js";
import { userRegisterValidationRules, userUpdateValidationRules } from "../validations/register.validator.js";
import { verifyToken } from "../middlewares/auth.js";

const UsersRouter = Router();

UsersRouter.post("/verify", verifyTokenIsValid);
UsersRouter.get("/", verifyToken, getAllUsers);
UsersRouter.get("/grade/:grade", verifyToken, getAllStudentsByGrade);
UsersRouter.post("/role", verifyToken, getAllUsersxRole);
UsersRouter.post(
  "/",
  verifyToken,
  userRegisterValidationRules(),
  validate,
  createUsers
);
UsersRouter.put(
  "/:id",
  verifyToken,
  userUpdateValidationRules(),
  validate,
  updateUsersSubject
);
UsersRouter.delete("/:id", verifyToken, deleteUsers);

export default UsersRouter;
