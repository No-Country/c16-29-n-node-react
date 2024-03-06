import db from "../db.js";
import { DataTypes } from "sequelize";

export const NoteModel = db.define(
  "Notes",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    date: { type: DataTypes.DATE },
    note: { type: DataTypes.STRING },
    is_public: { type: DataTypes.TINYINT(0, 1), defaultValue: "0" },
    teacher_id: { type: DataTypes.INTEGER, allowNull: false },
    student_id: { type: DataTypes.INTEGER, allowNull: false },
    subject_id: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    timestamps: false,
  }
);
