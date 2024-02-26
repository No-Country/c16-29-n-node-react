import  { UsersModel }  from "../database/models/UsersModel.js";

export const getUserByEmail = async (email) => {// usuario por email
    try {
      return await UsersModel.findOne({//busca un usuario por su email
        where: {
          email,
        },
      });
    } catch (error) {
      console.error("Error while fetching user:", error);
      throw new Error("Error fetching user");
    }
  };