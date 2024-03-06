import { body, checkExact } from "express-validator";

export const createNonAttendanceValidationRules = () => {
  return checkExact([
    body("date")
      .notEmpty()
      .withMessage("La fecha es requerida")
      .isString()
      .withMessage("Debe ser un string")
      .isISO8601()
      .toDate()
      .withMessage("Debe ser una fecha"),
    body("type")
      .notEmpty()
      .withMessage("Se debe enviar el tipo de inasistencia")
      .isString()
      .withMessage("Debe ser un string")
      .custom((value) => ["NON_ATTENDANCE", "DELAYED"].includes(value))
      .withMessage("Debe ser un tipo de inasistencia valida"),
    body("note")
      .optional()
      .isString()
      .withMessage("Debe ser un string"),
    body("students")
      .notEmpty()
      .withMessage("El estudiante es requerido")
      .isArray()
      .withMessage("Debe ser un arreglo")
      .custom((students) => {
        const thereIsError = students.some((student) => !Number(student));
        return !thereIsError
      })
      .withMessage("El array debe contener id's como numeros"),
    body("subject_id")
      .notEmpty()
      .withMessage("La materia es requerido")
      .isInt()
      .withMessage("Debe ser un Numerico")
  ], {
    message: "Se estan enviando parametros que no se aceptan"
  });
};

export const updateNonAttendanceValidationRules = () => {
  return checkExact([
    body("type")
      .optional()
      .isString()
      .withMessage("Debe ser un string")
      .custom((value) => ["NON_ATTENDANCE", "DELAYED"].includes(value))
      .withMessage("Debe ser un tipo de amonestacion valida"),
    body("note")
      .optional()
      .isString()
      .withMessage("Debe ser un string")
  ], {
    message: "Se estan enviando parametros que no se aceptan"
  });
};