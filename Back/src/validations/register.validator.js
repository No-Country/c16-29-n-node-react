const  { check, body} = require("express-validator");
const db = require("../database/models");
const {} = require("../services/user.service");
// api de registro
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

const userRegisterValidationRules = () =>{
    return [
        check("username").notEmpty().withMessage("el nombre de usuario es requerido"),
        check("password").notEmpty().isLength({min: 6, max: 12}).withMessage("la contraseña debe tener un minimo de 8 caracteres"),
        check("first_name").notEmpty().withMessage("el nombre es requerido"),
        check("last_name").notEmpty().withMessage("El apellido es requerido"),
        check("email").isEmail().withMessage("ingresar un email valido")
    ];
};
module.exports ={
     userRegisterValidationRules};