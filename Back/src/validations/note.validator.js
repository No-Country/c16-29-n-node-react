import { body, checkExact } from "express-validator";

export const createNoteValidationRules = () => {
  return checkExact([
    body("date")
      .notEmpty()
      .withMessage("La fecha es requerida")
      .isString()
      .withMessage("Debe ser un string")
      .isISO8601()
      .toDate()
      .withMessage("Debe ser una fecha"),
    body("note")
      .notEmpty()
      .withMessage("La observacion es requerida")
      .isString()
      .withMessage("Debe ser un string"),
    body("is_public")
      .notEmpty()
      .withMessage("Se debe enviar si es publica o no")
      .isBoolean()
      .withMessage("Debe ser un Booleano"),
    body("student_id")
      .notEmpty()
      .withMessage("El estudiante es requerido")
      .isInt()
      .withMessage("Debe ser un Numerico"),
    body("subject_id")
      .notEmpty()
      .withMessage("La materia es requerido")
      .isInt()
      .withMessage("Debe ser un Numerico")
  ], {
    message: "Se estan enviando parametros que no se aceptan"
  });
};

export const updateNoteValidationRules = () => {
  return checkExact([
    body("note")
      .optional()
      .notEmpty()
      .withMessage("La observacion es requerida")
      .isString()
      .withMessage("Debe ser un string"),
    body("is_public")
      .optional()
      .notEmpty()
      .withMessage("Se debe enviar si es publica o no")
      .isBoolean()
      .withMessage("Debe ser un Booleano"),
  ], {
    message: "Se estan enviando parametros que no se aceptan"
  });
};