import { Router } from "express";
import { verifyToken } from "../middlewares/auth.js";
import {
  createAttendances,
  deleteAttendances,
  getAllAttendances,
  getAttendances,
  updateAttendances,
} from "../controllers/AttendancesController.js";

const attendancesRouter = Router();

attendancesRouter.get("/:id", verifyToken, getAttendances);
attendancesRouter.get("/", verifyToken, getAllAttendances);
attendancesRouter.post("/", verifyToken, createAttendances);
attendancesRouter.put("/:id", verifyToken, updateAttendances);
attendancesRouter.delete("/:id", verifyToken, deleteAttendances);

export default attendancesRouter;
