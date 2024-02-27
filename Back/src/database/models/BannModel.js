import db from "../db.js";
import { DataTypes } from "sequelize";

export const BannModel = db.define(
  "Banns",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    score: {
      type: DataTypes.ENUM("EXPELLED", "SUSPENDED", "WARNING"),
      allowNull: false,
    },
    note: { type: DataTypes.STRING, allowNull: false },
    teacher_id: { type: DataTypes.INTEGER, allowNull: false },
    student_id: { type: DataTypes.INTEGER, allowNull: false },
    subject_id: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    timestamps: false,
  }
);
