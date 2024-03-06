import { check, body } from "express-validator";
import { compareSync } from "bcrypt";
import { getUserByUsername } from "../services/user.service.js";

/* name: { type: DataTypes.STRING(255), allowNull: false },
grade: { type: DataTypes.STRING(255), allowNull: false },
divition: { type: DataTypes.STRING(255), allowNull: false },
}, */
export const subjectValidatorRules = (req, res, next) =>{
    return [
        check("name").notEmpty().isString().withMessage("el nombre es requerido"),
        check("grade").notEmpty().isLength({min: 1}).isString().withMessage("la grado es requerido"),
        check("divition").notEmpty().isString().isLength({min: 1 }).withMessage("La division es requerida")
        //check if the user is already in
    ]
}
