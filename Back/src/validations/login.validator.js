const { check, body } = require('express-validator');
const bcrypt = require("bcrypt");
//requerir los  services de la api;
/* const UserService = require('../services/user.service'); */

 const userLoginValidationsRules = () =>{
    return [
        check("dni").notEmpty().withMessage("Ingrese su  usuario"),//obligatorio
        check("password").notEmpty().withMessage("ingrese su contraseña")
        .isLength({ min: 6,  max: 12, }).withMessage("La contraseña debe tener un minimo de 6 caracteres y un maximo de 12")


        /* promesa de services para obtener el usuario registrado */
    ];
 };
 
 module.exports = userLoginValidationsRules;