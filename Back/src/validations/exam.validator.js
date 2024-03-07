import { body, checkExact } from "express-validator";

export const createExamValidationRules = () => {
  return checkExact([
    body("date")
      .notEmpty()
      .withMessage("La fecha es requerida")
      .isString()
      .withMessage("Debe ser un string")
      .isISO8601()
      .toDate()
      .withMessage("Debe ser una fecha"),
    body("title")
      .notEmpty()
      .withMessage("El titulo es requerida")
      .isString()
      .withMessage("Debe ser un string"),
    body("note")
      .optional()
      .isString()
      .withMessage("Debe ser un string"),
    body("subject_id")
      .notEmpty()
      .withMessage("La materia es requerida")
      .isInt()
      .withMessage("Debe ser un Numerico")
  ], {
    message: "Se estan enviando parametros que no se aceptan"
  });
};

export const updateExamValidationRules = () => {
  return checkExact([
    body("title")
      .optional()
      .isString()
      .withMessage("Debe ser un string"),
    body("note")
      .optional()
      .isString()
      .withMessage("Debe ser un string")
  ], {
    message: "Se estan enviando parametros que no se aceptan"
  });
};