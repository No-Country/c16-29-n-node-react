import { Router } from "express";
import {
  getSubjects,
  getSubjectById,
  getStudentsCountBySubject,
  getTeacherCountBySubject,
  getAllSubjectsAndStudentsAndTeachers,
  createSubject,
  updateSubject,
  deleteSubject,
  assignSubjectToUsers,
  deassignUserFromSubject,
  getStudentsBySubjectFullName
} from "../controllers/subject.controller.js";
import { verifyToken } from "../middlewares/auth.js";
import { subjectValidatorRules, updateSubjectValidatorRules } from "../validations/subject.validator.js";
import validate from "../validations/index.validator.js"

const subjectRouter = Router();

subjectRouter
  .get("/", verifyToken, getSubjects) // todas las materias
  .get("/principal/:id", verifyToken, getAllSubjectsAndStudentsAndTeachers) // todas las materias con alumnos y maestros
  .get("/currentTeacher/:id", verifyToken, getTeacherCountBySubject) // maestros por materia
  .get("/currentStudent/:id", verifyToken, getStudentsCountBySubject) // estudiantes por materia
  .get("/:name/:grade/:divition", verifyToken, getStudentsBySubjectFullName) // estudiantes por materia
  .get("/:id", verifyToken, getSubjectById) // materia por id
  .put("/:id", verifyToken, updateSubjectValidatorRules(), validate, updateSubject) // modificar materia por id
  .put("/assign/:id", verifyToken, assignSubjectToUsers) // Asignar materia a usuarios
  .post("/", verifyToken, subjectValidatorRules(), validate, createSubject) // crear una materia
  .delete("/:subjectId/deassign/:userId", verifyToken, deassignUserFromSubject) // Asignar materia a usuarios
  .delete("/:id", verifyToken, deleteSubject); // borrar una materia

export default subjectRouter;
