import { body, check, checkExact, param } from "express-validator";
import { compareSync } from "bcrypt";
import { getUserByUsername } from "../services/user.service.js";

/* name: { type: DataTypes.STRING(255), allowNull: false },
grade: { type: DataTypes.STRING(255), allowNull: false },
divition: { type: DataTypes.STRING(255), allowNull: false },
}, */
export const subjectValidatorRules = (req, res, next) =>{
    return checkExact([
        body("name")
            .notEmpty()
            .isString()
            .withMessage("el nombre es requerido"),
        body("grade")
            .notEmpty()
            .isLength({min: 1})
            .isString()
            .withMessage("la grado es requerido"),
        body("divition")
            .notEmpty()
            .isString()
            .isLength({min: 1 })
            .withMessage("La division es requerida"),
        body("teachers")
            .optional()
            .isArray()
            .custom((students) => {
                const thereIsError = students.some((student) => !Number(student));
                return !thereIsError
              })
            .withMessage("El array debe contener id's como numeros")
    ], {
        message: "No se deben pasar parametros demas"
    })
}

export const updateSubjectValidatorRules = (req, res, next) =>{
    return checkExact([
        body("name")
            .optional()
            .notEmpty()
            .isString()
            .withMessage("el nombre es requerido"),
        body("grade")
            .optional()
            .notEmpty()
            .isLength({min: 1})
            .isString()
            .withMessage("la grado es requerido"),
        body("divition")
            .optional()
            .notEmpty()
            .isString()
            .isLength({min: 1 })
            .withMessage("La division es requerida"),
        body("teachers")
            .optional()
            .optional()
            .isArray()
            .custom((students) => {
                const thereIsError = students.some((student) => !Number(student));
                return !thereIsError
              })
            .withMessage("El array debe contener id's como numeros")
    ], {
        message: "No se deben pasar parametros demas"
    })
}
