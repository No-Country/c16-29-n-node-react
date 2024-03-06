import { body, checkExact } from "express-validator";

export const createBannValidationRules = () => {
  return checkExact([
    body("date")
      .notEmpty()
      .withMessage("La fecha es requerida")
      .isString()
      .withMessage("Debe ser un string")
      .isISO8601()
      .toDate()
      .withMessage("Debe ser una fecha"),
    body("reason")
      .notEmpty()
      .withMessage("La razon es requerida")
      .isString()
      .withMessage("Debe ser un string"),
    body("type")
      .notEmpty()
      .withMessage("Se debe enviar el tipo de amonestacion")
      .isString()
      .withMessage("Debe ser un string")
      .custom((value) => ["EXPELLED", "SUSPENDED", "WARNING"].includes(value))
      .withMessage("Debe ser un tipo de amonestacion valida"),
    body("note")
      .optional()
      .isString()
      .withMessage("Debe ser un string"),
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

export const updateBannValidationRules = () => {
  return checkExact([
    body("reason")
      .optional()
      .isString()
      .withMessage("Debe ser un string"),
    body("type")
      .optional()
      .isString()
      .withMessage("Debe ser un string")
      .custom((value) => ["EXPELLED", "SUSPENDED", "WARNING"].includes(value))
      .withMessage("Debe ser un tipo de amonestacion valida"),
    body("note")
      .optional()
      .isString()
      .withMessage("Debe ser un string")
  ], {
    message: "Se estan enviando parametros que no se aceptan"
  });
};