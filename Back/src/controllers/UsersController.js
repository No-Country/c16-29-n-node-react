import { UserModel } from "../database/models/index.js";
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
    if (req.body.role === "STUDENT") {
      attributes = [
        "username",
        "first_name",
        "last_name",
        "role",
        "email",
        "phone",
        "grade",
        "created_at",
        "updated_at",
      ];
    } else {
      attributes = [
        "username",
        "first_name",
        "last_name",
        "role",
        "email",
        "phone",
        "created_at",
        "updated_at",
      ];
    }
    const users = await UserModel.findAll({
      attributes: attributes,
      where: { role: req.body.role },
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
    await UserModel.create(req.body);
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

export const validateUser = async (username) => {
  let user = {};
  try {
    const resUser = await UserModel.findOne({
      attributes: ["role", "password" , "id"],
      where: { username: username },
    });

    if (resUser) {
      user.role = resUser.dataValues.role;
      user.passHash = resUser.dataValues.password;
      user.id =  resUser.dataValues.id;

      return user;
    } else {
      return (user = {});
    }
  } catch (error) {
    return error.message;
  }
};
