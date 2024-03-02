import { UserModel, NoteModel, SubjectModel, BannModel, ExamModel, MarkModel, NonAttendanceModel } from "../database/models/index.js";
import {StudentTutorModel} from "../database/models/associations.js"
import { encrypt, verified } from "../middlewares/encrypt.js";
import { compare } from "bcrypt";

//Metodos CRUD

//Mostrar todos los registros
export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.findAll({
      attributes: [
        "username",
        "first_name",
        "last_name",
        "role",
        "email",
        "phone",
      ],
    });
    res.json(users);
  } catch (error) {
    res.json({ message: error.message });
  }
};

//Mostrar todos los registros por role
export const getAllUsersxRole = async (req, res) => {
  try {
    let attributes = [];
    let include = [];
    if (req.body.role === "STUDENT") {
      attributes = [
        "username",
        "first_name",
        "last_name",
        "role",
        "email",
        "phone",
        "grade",
      ];
      include = [NoteModel, SubjectModel, BannModel, ExamModel, MarkModel, NonAttendanceModel]
    } else {
      attributes = [
        "username",
        "first_name",
        "last_name",
        "role",
        "email",
        "phone",
      ];
    }
    const users = await UserModel.findAll({
      attributes: attributes,
      where: { role: req.body.role },
      include: include,
    });
    res.json(users);
  } catch (error) {
    res.json({ message: error.message });
  }
};

//Mostrar todos los registros por role
export const getAllUsersxNote = async (req, res) => {
  try {
    let attributes = [];
    let include = [];
    if (req.body.role === "STUDENT") {
      attributes = [
        "username",
        "first_name",
        "last_name",
        "role",
        "email",
        "phone",
        "grade",
      ];
      include = NoteModel
    } else {
      attributes = [
        "username",
        "first_name",
        "last_name",
        "role",
        "email",
        "phone",
      ];
    }
    const users = await UserModel.findAll({
      attributes: attributes,
      where: { role: req.body.role },
      include: include,
    });
    res.json(users);
  } catch (error) {
    res.json({ message: error.message });
  }
};

//Mostrar todos los registros por grado
export const getAllUsersxGrade = async (req, res) => {
  try {
    const users = await UserModel.findAll({
      where: { grade: req.body.grade },
    });
    res.json(users);
  } catch (error) {
    res.json({ message: error.message });
  }
};

//Mostrar un registro
export const getUsers = async (req, res) => {
  try {
    const users = await UserModel.findAll({
      where: { username: req.body.username },
    });
    res.json(users);
  } catch (error) {
    res.json({ message: error.message });
  }
};

//Crear un registro
export const createUsers = async (req, res) => {
  console.log(req.body);
  try {
    let pass = req.body.password;
    let hpass = await encrypt(pass);
    req.body.password = hpass;
    await UserModel.create(req.body,);
    res.json({
      message: "Registro creado correctamente",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//Crear un registro por subject
export const createUsersSubject = async (req, res) => {
  console.log(req.body);
  try {    
    let pass = req.body.password;
    if(pass){      
      let hpass = await encrypt(pass);
      req.body.password = hpass;
    }
    await UserModel.create(req.body, {
      include: SubjectModel
    });
    res.json({
      message: "Registro creado correctamente",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//Crear un registro por subject y Tutor
export const createUsersSubjectTutor = async (req, res) => {
  console.log(req.body);
  try {    
    let pass = req.body.password;
    if(pass){      
      let hpass = await encrypt(pass);
      req.body.password = hpass;
    }
    await UserModel.create(req.body, {
      include: [SubjectModel, StudentTutorModel]
    });
    res.json({
      message: "Registro creado correctamente",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//Actualizar
export const updateUsers = async (req, res) => {
  try {
    let pass = req.body.password;
    if (pass) {
      let pass = req.body.password;
      let hpass = await encrypt(pass);
      req.body.password = hpass;
    }

    await UserModel.update(req.body, {
      where: { username: req.body.username },
    });

    res.json({
      message: "Registro actualizado correctamente",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//Actualizar user con subject
export const updateUsersSubject = async (req, res) => {
  try {
    let pass = req.body.password;
    if (pass) {
      let pass = req.body.password;
      let hpass = await encrypt(pass);
      req.body.password = hpass;
    }

    await UserModel.update(req.body, {
      where: { username: req.body.username },
      include: SubjectModel,
    });

    res.json({
      message: "Registro actualizado correctamente",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//Eliminar
export const deleteUsers = async (req, res) => {
  try {
    UserModel.destroy({
      where: { id_number: req.params.id },
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};


//Validacion de usuario
export const validateUser = async (username) => {
  let user = {};
  try {
    const resUser = await UserModel.findOne({
      attributes: ["role", "password"],
      where: { username: username },
    });

    if (resUser) {
      user.role = resUser.dataValues.role;
      user.passHash = resUser.dataValues.password;

      return user;
    } else {
      return (user = {});
    }
  } catch (error) {
    return error.message;
  }
};
