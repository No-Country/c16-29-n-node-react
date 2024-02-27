import { Router } from "express";
import { verifyToken } from "../middlewares/auth.js";
import {
  getAllMarks,
  getMarkId,
  createMark,
  upMark,
  getMarkStudent,
} from "../controllers/mark.controller.js";

const markRouter = Router();

markRouter
  .get("/", getAllMarks) 
  .get("/:id",  getMarkId)
  .get("/current", verifyToken, getMarkStudent)
  .post("/exams", verifyToken, createMark)
  .put("/:id", verifyToken, upMark);

export default markRouter;
/*   POST /api/exams [TEACHER]
POST /api/exams/marks [TEACHER]
PUT /api/marks/:id [TEACHER]
GET /api/exams/current [TEACHER]
GET /api/exams/:id/marks [TEACHER]
GET /api/marks/current [TUTOR, STUDENT] */
