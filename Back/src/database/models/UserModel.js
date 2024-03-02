import db from "../db.js";
import { DataTypes } from "sequelize";

export const UserModel = db.define(
  "Users",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    username: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
    first_name: { type: DataTypes.STRING },
    last_name: { type: DataTypes.STRING },
    role: {
      type: DataTypes.ENUM("PRINCIPAL", "TEACHER", "TUTOR", "STUDENT"),
      defaultValue: "STUDENT",
      allowNull: false,
    },
    email: { type: DataTypes.STRING },
    phone: { type: DataTypes.STRING },
    grade: { type: DataTypes.STRING },
  },
  {
    timestamps: true,
  }
);
