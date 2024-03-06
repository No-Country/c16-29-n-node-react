import { Router } from "express";
import { verifyToken } from "../middlewares/auth.js";
import {
  getAllMarks,
  getMarkId,
  createMark,
  upMark,
  getMarkStudent,
} from "../controllers/mark.controller.js";
import { getExams, createExam } from "../controllers/exam.controller.js";


const markRouter = Router();
/* id: { type: DataTypes.INTEGER(11), primaryKey: true, autoIncrement: true },
    score: { type: DataTypes.INTEGER(11), allowNull: false },
    note: { type: DataTypes.STRING(250), allowNull: false },
    student_id: { type: DataTypes.INTEGER, allowNull: false },
    exam_id: { type: DataTypes.INTEGER },
 */
markRouter
  .get("/exams", getExams) 
  .post("/exams" , createExam)
  .get("/", getAllMarks) 
  .get("/:id",  getMarkId)
  .get("/current/:id", getMarkStudent)
  .post("/", /* verifyToken, */ createMark)
  .put("/:id", verifyToken, upMark);

export default markRouter;
/*   POST /api/exams [TEACHER]
POST /api/exams/marks [TEACHER]
PUT /api/marks/:id [TEACHER]
GET /api/exams/current [TEACHER]
GET /api/exams/:id/marks [TEACHER]
GET /api/marks/current [TUTOR, STUDENT] */
