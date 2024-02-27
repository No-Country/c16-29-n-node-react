import { check, body } from "express-validator";
import { compareSync } from "bcrypt";
import { getUserByUsername } from "../services/user.service.js";

/* name: { type: DataTypes.STRING(255), allowNull: false },
grade: { type: DataTypes.STRING(255), allowNull: false },
divition: { type: DataTypes.STRING(255), allowNull: false },
}, */
export const subjectValidatorRules = (req, res, next) =>{
    return [
        check("name").notEmpty().withMessage("el nombre es requerido"),
        check("grade").notEmpty().withMessage("la grado es requerido"),
        check("division").notEmpty().withMessage("La division es requerida")
        //check if the user is already in
    ] 
} 