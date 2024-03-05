import { Router } from "express";
import { verifyToken } from "../middlewares/auth.js";
import {
  createNonAttendances,
  deleteNonAttendances,
  getAllNonAttendances,
  getNonAttendances,
  updateNonAttendances,
} from "../controllers/NonAttendancesController.js";

const NonAttendancesRouter = Router();

NonAttendancesRouter.get("/:id", verifyToken, getNonAttendances);
NonAttendancesRouter.get("/", verifyToken, getAllNonAttendances);
NonAttendancesRouter.post("/", verifyToken, createNonAttendances);
NonAttendancesRouter.put("/:id", verifyToken, updateNonAttendances);
NonAttendancesRouter.delete("/:id", verifyToken, deleteNonAttendances);

export default NonAttendancesRouter;
