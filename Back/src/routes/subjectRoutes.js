import { Router } from "express";
import {
  getSubjects,
  getSubjectById,
  getStudentsCountBySubject,
  getTeacherCountBySubject,
  getAllSubjectsAndStudentsAndTeachers,
  createSubject,
  updateSubject,
  deleteSubject
} from "../controllers/subject.controller.js";
import { verifyToken } from "../middlewares/auth.js";
import { subjectValidatorRules } from "../validations/subject.validator.js";
import validate from "../validations/index.validator.js"

const subjectRouter = Router();

subjectRouter
  .get("/", getSubjects) // todas las materias
  .get("/principal/:id", getAllSubjectsAndStudentsAndTeachers) // todas las materias con alumnos y maestros
  .get("/currentTeacher/:id",  getTeacherCountBySubject)//estudiantes por materia
  .get("/currentStudent/:id",  getStudentsCountBySubject)//estudiantes por materia
  .get("/:id", getSubjectById) // materia por id
  .put("/update/:id", subjectValidatorRules(), validate ,  updateSubject)
  .post("/create", subjectValidatorRules(), validate, createSubject)
  .delete("/delete/:id", deleteSubject); 

export default subjectRouter;
