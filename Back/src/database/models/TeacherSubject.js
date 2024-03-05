import db from "../db.js";
import { DataTypes } from "sequelize";

export const TeacherSubject = db.define(
  'TeacherSubjects',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    subject_id: { type: DataTypes.INTEGER, allowNull: false },
    teacher_id: { type: DataTypes.INTEGER, allowNull: false }
  },
  {
    timestamps: false
  }
);