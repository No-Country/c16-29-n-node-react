import { Router } from "express";
import { verifyToken } from "../middlewares/auth.js";
import {
  getAllMarks,
  createMark,
  upMark,
  getMarkByExamId,
  deleteMark,
} from "../controllers/mark.controller.js";
import { getExams, createExam, updateExam, getCurrentExams, deleteExam } from "../controllers/exam.controller.js";
import { createExamValidationRules, updateExamValidationRules } from "../validations/exam.validator.js";
import { createMarkValidationRules, updateMarkValidationRules } from "../validations/mark.validator.js";
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
  .get("/exams/current", verifyToken, getCurrentExams)
  .post("/exams", verifyToken, createExamValidationRules(), validate, createExam)
  .put("/exams/:id", verifyToken, updateExamValidationRules(), validate, updateExam)
  .delete("/exams/:id", verifyToken, deleteExam)
  .get("/", verifyToken, getAllMarks) 
  .get("/exams/:id", verifyToken, getMarkByExamId)
  .post("/", verifyToken, createMarkValidationRules(), validate, createMark)
  .put("/:id", verifyToken, updateMarkValidationRules(), validate, upMark)
  .delete("/:id", verifyToken, deleteMark);

export default markRouter;
/*   POST /api/exams [TEACHER]
POST /api/exams/marks [TEACHER]
PUT /api/marks/:id [TEACHER]
GET /api/exams/current [TEACHER]
GET /api/exams/:id/marks [TEACHER]
GET /api/marks/current [TUTOR, STUDENT] */
