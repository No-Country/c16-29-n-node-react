import { check, body, checkExact, param } from "express-validator";
import { getUserByEmail, getUserByUsername } from "../services/user.service.js";
import { UserModel } from "../database/models/UserModel.js";
/* CREATE TABLE `Users` (
    `id` int(11) NOT NULL,
    `username` varchar(255) NOT NULL COMMENT 'DNI',
    `password` varchar(255) NOT NULL,
    `first_name` varchar(255) NOT NULL,
    `last_name` varchar(255) NOT NULL,
    `role` enum('PRINCIPAL','TEACHER','TUTOR','STUDENT') DEFAULT NULL,
    `email` varchar(255) DEFAULT NULL,
    `phone` varchar(255) DEFAULT NULL,
    `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
  ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
   */

export const userRegisterValidationRules = () => {
  return checkExact(
    [
      body("username")
        .notEmpty()
        .withMessage("el nombre de usuario es requerido"),
      body("password")
        .notEmpty()
        .isLength({ min: 6, max: 12 })
        .withMessage(
          "la contraseña debe tener un minimo de 6 caracteres y maximo de 12"
        ),
      body("first_name").notEmpty().withMessage("el nombre es requerido"),
      body("last_name").notEmpty().withMessage("El apellido es requerido"),
      body("email")
        .optional()
        .notEmpty()
        .withMessage("el email es requerido")
        .isEmail()
        .withMessage("ingresar un email valido"),
      body("email")
        .optional()
        .custom(async (value) => {
          // caso de que el email ya este registrado
          const user = await getUserByEmail(value);
          if (user) {
            //rechaza la promesa y manda el mensjae de error
            return Promise.reject("Este correo ya se encuentra registrado");
          }
        }),
      body("phone")
        .optional()
        .isString()
        .withMessage("Debe ser un string")
        .isMobilePhone()
        .withMessage("Debe ser un numero de telefono"),
      body("role")
        .isString()
        .withMessage("Debe ser un string")
        .custom((value) =>
          ["PRINCIPAL", "TEACHER", "TUTOR", "STUDENT"].includes(value)
        )
        .withMessage(
          'Debe ser un rol definido ("PRINCIPAL" | "TEACHER" | "TUTOR") | "STUDENT"'
        ),
      body("grade")
        .if((value, { req }) => req.body.role === "STUDENT")
        .notEmpty()
        .withMessage("Debe ser requerido")
        .isString()
        .withMessage("Debe ser un string")
        .isLength({ max: 1 })
        .withMessage("El maximo del grado es 1"),
      body("subjects")
        .optional()
        .custom((value, { req }) => req.body.role === "TEACHER")
        .withMessage("Las materias es solo para el rol de profesor")
        .isArray()
        .withMessage("Debe ser un arreglo"),
      body("tutors")
        .optional()
        .custom((value, { req }) => req.body.role === "STUDENT")
        .withMessage("Los tutores solo son para el rol de estudiante")
        .isArray()
        .withMessage("Debe ser un arreglo"),
      body("students")
        .optional()
        .custom((value, { req }) => req.body.role === "TUTOR")
        .withMessage("Los estudiantes solo son para el rol de tutores")
        .isArray()
        .withMessage("Debe ser un arreglo"),
    ],
    {
      message: "Se estan enviando parametros que no se aceptan",
    }
  );
};

export const userUpdateValidationRules = () => {
  return checkExact(
    [
      body("username")
        .optional()
        .notEmpty()
        .withMessage("el nombre de usuario es requerido"),
      body("password")
        .optional()
        .notEmpty()
        .isLength({ min: 6, max: 12 })
        .withMessage(
          "la contraseña debe tener un minimo de 6 caracteres y maximo de 12"
        ),
      body("first_name")
        .optional()
        .notEmpty()
        .withMessage("el nombre es requerido"),
      body("last_name")
        .optional()
        .notEmpty()
        .withMessage("El apellido es requerido"),
      body("email")
        .optional()
        .notEmpty()
        .withMessage("el email es requerido")
        .isEmail()
        .withMessage("ingresar un email valido"),
      body("email")
        .optional()
        .custom(async (value) => {
          // caso de que el email ya este registrado
          const user = await getUserByEmail(value);
          if (user) {
            //rechaza la promesa y manda el mensjae de error
            return Promise.reject("Este correo ya se encuentra registrado");
          }
        }),
      body("grade")
        .optional()
        .notEmpty()
        .withMessage("Debe ser requerido")
        .isString()
        .withMessage("Debe ser un string")
        .isLength({ max: 1 })
        .withMessage("El maximo del grado es 1"),
      body("phone")
        .optional()
        .isString()
        .withMessage("Debe ser un string")
        .isMobilePhone()
        .withMessage("Debe ser un numero telefonico"),
      body("subjects")
        .optional()
        .custom(async (value, { req }) => {
          const id = req.params.id;
          const user = await UserModel.findByPk(id);
          console.log(user);
          if (!user) throw new Error("No se encontró el usuario");
          if (user.role !== "TEACHER")
            throw new Error("Las materias es solo para el rol de profesor");
        })
        .withMessage("Las materias es solo para el rol de profesor")
        .isArray()
        .withMessage("Debe ser un arreglo"),
      body("tutors")
        .optional()
        .custom(async (value, { req }) => {
          const id = req.params.id;
          const user = await UserModel.findByPk(id);
          if (!user) throw new Error("No se encontró el usuario");
          if (user.role !== "STUDENT")
            throw new Error("Los tutores solo son para el rol de estudiante");
        })
        .withMessage("Los tutores solo son para el rol de estudiante")
        .isArray()
        .withMessage("Debe ser un arreglo"),
      body("students")
        .optional()
        .custom(async (value, { req }) => {
          const id = req.params.id;
          const user = await UserModel.findByPk(id);
          if (!user) throw new Error("No se encontró el usuario");
          if (user.role !== "TUTOR")
            throw new Error("Los estudiantes solo son para el rol de tutores");
        })
        .withMessage("Los estudiantes solo son para el rol de tutores")
        .isArray()
        .withMessage("Debe ser un arreglo"),
    ],
    {
      message: "Se estan enviando parametros que no se aceptan",
    }
  );
};
/* export default{ userRegisterValidationRules}; */
