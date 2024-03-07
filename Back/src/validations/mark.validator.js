import { body, checkExact } from "express-validator";

export const createMarkValidationRules = () => {
  return checkExact([
    body("score")
      .notEmpty()
      .withMessage("El puntaje es requerida")
      .isInt()
      .withMessage("Debe ser un numero"),
    body("note")
      .optional()
      .isString()
      .withMessage("Debe ser un string"),
    body("student_id")
      .notEmpty()
      .withMessage("El estudiante es requerido")
      .isInt()
      .withMessage("Debe ser un Numerico"),
    body("exam_id")
      .notEmpty()
      .withMessage("El examen es requerido")
      .isInt()
      .withMessage("Debe ser un Numerico")
  ], {
    message: "Se estan enviando parametros que no se aceptan"
  });
};

export const updateMarkValidationRules = () => {
  return checkExact([
    body("note")
      .optional()
      .isString()
      .withMessage("Debe ser un string"),
  ], {
    message: "Se estan enviando parametros que no se aceptan"
  });
};