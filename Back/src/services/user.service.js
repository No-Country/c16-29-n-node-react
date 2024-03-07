import { UserModel } from "../database/models/index.js";

export const getUserByUsername = async (username) => {
  // usuario por username
  try {
    return await UserModel.findOne({
      //busca un usuario por su username
      where: {
        username,
      },
    });
  } catch (error) {
    console.error("Error while fetching user:", error);
    throw new Error("Error fetching user");
  }
};

export const getUserByEmail = async (email) => {
  // usuario por username
  try {
    return await UserModel.findOne({
      //busca un usuario por su username
      where: {
        email,
      },
    });
  } catch (error) {
    console.error("Error while fetching user:", error);
    throw new Error("Error fetching user");
  }
};

export const getUserById = async (id) => {
  // usuario por username
  try {
    return await UserModel.findByPk(id);
  } catch (error) {
    console.error("Error while fetching user:", error);
    throw new Error("Error fetching user");
  }
};
