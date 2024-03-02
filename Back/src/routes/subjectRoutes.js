import { Router } from "express";
import {
  getSubjects,
  getSubjectById,
  getStudentsCountBySubject,
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
  .get("/current/:id",  getStudentsCountBySubject)//estudiantes por maateria
  .get("/:id", getSubjectById) // materia por id
  .put("/update/:id", subjectValidatorRules(), validate ,  updateSubject)
  .post("/create", subjectValidatorRules(), validate, createSubject)
  .delete("/delete/:id", deleteSubject); 

export default subjectRouter;
