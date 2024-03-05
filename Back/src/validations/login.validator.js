import { check, body } from "express-validator";
import { compareSync } from "bcrypt";
import { getUserByUsername } from "../services/user.service.js";

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
export const userLoginValidationsRules = () => {
  return [
    check("username").notEmpty().withMessage("Ingrese su  usuario"), //obligatorio
    check("password")
      .notEmpty()
      .withMessage("ingrese su contraseña")
      .isLength({ max: 12 })
      .withMessage(
        "La contraseña debe tener un minimo de 6 caracteres y un maximo de 12"
      ),

    body("custom").custom(async (value, { req }) => {
      return getUserByUsername(req.body.username)
        .then((user) => {
          if (!compareSync(req.body.password, user.dataValues.password)) {
            return Promise.reject();
          }
        })
        .catch(() => Promise.reject("Usuario o constraseña incorrecto"));
    }),
    /* promesa de services para obtener el usuario registrado */
  ];
};

/*  export default userLoginValidationsRules; */
