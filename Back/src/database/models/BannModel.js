import db from "../db.js";
import { DataTypes } from "sequelize";

export const BannModel = db.define(
  "Banns",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    date: { type: DataTypes.DATE },
    reason: { type: DataTypes.STRING },
    type: {
      type: DataTypes.ENUM("EXPELLED", "SUSPENDED", "WARNING")
    },
    note: { type: DataTypes.STRING, allowNull: true },
    teacher_id: { type: DataTypes.INTEGER },
    student_id: { type: DataTypes.INTEGER },
    subject_id: { type: DataTypes.INTEGER },
  },
  {
    timestamps: false,
  }
);
