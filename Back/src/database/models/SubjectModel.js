import db from "../db.js";
import { DataTypes } from "sequelize";

export const SubjectModel = db.define(
  "Subject",
  {
    id: { type: DataTypes.INTEGER(11), allowNull: false, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(255), allowNull: false },
    grade: { type: DataTypes.STRING(255), allowNull: false },
    divition: { type: DataTypes.STRING(255), allowNull: false },
  },
  {
    timestamps: true,
  }
);
