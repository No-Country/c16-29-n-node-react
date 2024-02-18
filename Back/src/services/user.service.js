const { User } = require("../database/models");

//sevicios pasa informacion de  la base de datos al controlador//
const getUsers = async () => {
  try {
    return await User.findAll();//todos los usuarios
  } catch (error) {
    console.error("Error while fetching users:", error);
    throw new Error("Error fetching users");
  }
};

const getUserById = async (id) => {
  try {
    return await User.findByPk(id);//usuario por id
  } catch (error) {
    console.error("Error while fetching user:", error);
    throw new Error("Error fetching user");
  }
};

const getUserByEmail = async (email) => {// usuario por email
  try {
    return await User.findOne({//busaca un usuario por su email
      where: {
        email,
      },
    });
  } catch (error) {
    console.error("Error while fetching user:", error);
    throw new Error("Error fetching user");
  }
};

const insertUser = async (userData) => {//agrega un usuario // create
  try {
    return await User.create(userData);
  } catch (error) {
    console.error("Error while insert user:", error);
    throw new Error("Error insert user");
  }
};

const updateUser = async (userData) => {
  try {
    return await User.update(userData, { where: { id: userData.id } });
  } catch (error) {
    console.error("Error while update user:", error);
    throw new Error("Error update user");
  }
};

const deleteUser = async (userId) => {
  try {
    return await User.destroy({ where: { id: userData.id } });
  } catch (error) {
    console.error("Error while delete user:", error);
    throw new Error("Error delete user");
  }
};

module.exports = {
  getUsers,
  getUserById,
  getUserByEmail,
  insertUser,
  updateUser,
  deleteUser
}; /* metodos de los usuarios */