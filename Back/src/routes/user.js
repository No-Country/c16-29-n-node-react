const express = require("express");
const router = express.Router();
const {/* controladores de usuario */
  user,
  getTeacher,
  getTeacherById,
  getGuardians,
  getGuaradiansById,
  getStudents,
  getStudentById,
  createUsers,
  deleteUsers,
  updateUsers,
  login,
} = require("../controllers/user.controller");

  // middlewares
const { userRegisterValidationRules } = require("../validations/register.validator");//funcion de validaciones
const  { userLoginValidationRules } = require("../validations/loginUser.validator"); 
const validate = require("../validations/index.validator");//middleware que ejecuta los errores validationResult o continua si esta todo bien

 /* const verifyToken = require("../middlewares/jwt.middleware"); */



router
  .get("/", user)// localhost://3005/api/principal
  .get("/:id", getUserById)//localhost://3005/api/teacher/1
  .post("/register", userRegisterValidationRules(), validate, createUser)//http://localhost://3005/api/users/register
  .post("/login", userLoginValidationRules(), validate, login);
  /* .put("/:id", updateUser)
  .delete("/:id", deleteUser); */

module.exports = router;
