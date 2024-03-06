import { Router } from "express";
import { verifyToken } from "../middlewares/auth.js";
import {
  createNonAttendances,
  deleteNonAttendances,
  getCurrentNonAttendances,
  getNonAttendances,
  updateNonAttendances,
} from "../controllers/NonAttendancesController.js";

const NonAttendancesRouter = Router();

NonAttendancesRouter.get("/:id", verifyToken, getNonAttendances);
NonAttendancesRouter.get("/current", verifyToken, getCurrentNonAttendances);
NonAttendancesRouter.post("/", verifyToken, createNonAttendances);
NonAttendancesRouter.put("/:id", verifyToken, updateNonAttendances);
NonAttendancesRouter.delete("/:id", verifyToken, deleteNonAttendances);

export default NonAttendancesRouter;
