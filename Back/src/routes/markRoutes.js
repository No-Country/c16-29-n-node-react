import { Router } from "express";
import { verifyToken } from "../middlewares/auth.js";
import {
  getAllMarks,
  getMarkId,
  createMark,
  upMark,
  getMarkStudent,
} from "../controllers/mark.controller.js";
import { getExams, createExam, updateExam } from "../controllers/exam.controller.js";
import { createExamValidationRules, updateExamValidationRules } from "../validations/exam.validator.js";
import validate from "../validations/index.validator.js";


const markRouter = Router();
/* id: { type: DataTypes.INTEGER(11), primaryKey: true, autoIncrement: true },
    score: { type: DataTypes.INTEGER(11), allowNull: false },
    note: { type: DataTypes.STRING(250), allowNull: false },
    student_id: { type: DataTypes.INTEGER, allowNull: false },
    exam_id: { type: DataTypes.INTEGER },
 */
markRouter
  .get("/exams", verifyToken, getExams) 
  .post("/exams", verifyToken, createExamValidationRules(), validate, createExam)
  .put("/exams/:id", verifyToken, updateExamValidationRules(), validate, updateExam)
  .get("/", verifyToken, getAllMarks) 
  .get("/:id", verifyToken, getMarkId)
  .get("/current/:id", verifyToken, getMarkStudent)
  .post("/exams/create", verifyToken, createMark)
  .put("/:id", verifyToken, upMark);

export default markRouter;
/*   POST /api/exams [TEACHER]
POST /api/exams/marks [TEACHER]
PUT /api/marks/:id [TEACHER]
GET /api/exams/current [TEACHER]
GET /api/exams/:id/marks [TEACHER]
GET /api/marks/current [TUTOR, STUDENT] */
