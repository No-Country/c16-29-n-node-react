import { check, body } from "express-validator";
import UsersModel from "../database/models/UsersModel.js";
import  { getUserByEmail } from "../services/user.service.js";
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

export const userRegisterValidationRules = () =>{
    return [
        check("username").notEmpty().withMessage("el nombre de usuario es requerido"),
        check("password").notEmpty().isLength({min: 6, max: 12}).withMessage("la contraseña debe tener un minimo de 6 caracteres y maximo de 12"),
        check("first_name").notEmpty().withMessage("el nombre es requerido"),
        check("last_name").notEmpty().withMessage("El apellido es requerido"),
        check("email").notEmpty().withMessage("el email es requerido").isEmail().withMessage("ingresar un email valido"),
        body("email").custom( async (value) =>{ // caso de que el email ya este registrado
            const user = await getUserByEmail(value);
            if(user){//rechaza la promesa y manda el mensjae de error
                return Promise.reject("Este correo ya se encuentra registrado");
        }
      }),
        check("rolle").isInt().withMessage("roll invalido"),

 ];
};
/* export default{ userRegisterValidationRules}; */