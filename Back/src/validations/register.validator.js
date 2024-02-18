const  { check, body} = require("express-validator");
const db = require("../database/models")
// api de registro

const userRegisterValidationRules = () =>{
    return [
        check("name").notEmpty().withMessage("el nombre es requerido"),
        check("lastname").notEmpty().withMessage("el apellido es requerido"),

    ]
}
module.exports = userRegisterValidationRules;