import { Router } from "express";
import { verifyToken } from "../middlewares/auth.js";
import {
  createNonAttendances,
  deleteNonAttendances,
  getCurrentNonAttendances,
  updateNonAttendances,
} from "../controllers/NonAttendancesController.js";
import {
  createNonAttendanceValidationRules,
  updateNonAttendanceValidationRules
} from "../validations/nonattendance.validator.js";
import validate from "../validations/index.validator.js";

const NonAttendancesRouter = Router();

NonAttendancesRouter.get("/current", verifyToken, getCurrentNonAttendances);
NonAttendancesRouter.post("/", verifyToken, createNonAttendanceValidationRules(), validate, createNonAttendances);
NonAttendancesRouter.put("/:id", verifyToken, updateNonAttendanceValidationRules(), validate, updateNonAttendances);
NonAttendancesRouter.delete("/:id", verifyToken, deleteNonAttendances);

export default NonAttendancesRouter;
