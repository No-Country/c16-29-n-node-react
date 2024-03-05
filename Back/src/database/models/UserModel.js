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
    fullName: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.first_name} ${this.last_name}`;
      },
      set(value) {
        throw new Error('Do not try to set the `fullName` value!');
      }
    },
    role: {
      type: DataTypes.ENUM("PRINCIPAL", "TEACHER", "TUTOR", "STUDENT"),
      defaultValue: "STUDENT",
      allowNull: false,
    },
    email: { type: DataTypes.STRING, allowNull: true },
    phone: { type: DataTypes.STRING, allowNull: true },
    grade: { type: DataTypes.STRING },
  },
  {
    timestamps: true,
  }
);
