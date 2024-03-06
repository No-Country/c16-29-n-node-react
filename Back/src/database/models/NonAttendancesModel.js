import db from "../db.js";
import { DataTypes } from "sequelize";

export const NonAttendanceModel = db.define(
  "NonAttendances",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    type: {
      type: DataTypes.ENUM("NON_ATTENDANCE", "DELAYED")
    },
    date: { type: DataTypes.DATE },
    note: { type: DataTypes.STRING },
    teacher_id: { type: DataTypes.INTEGER, allowNull: false },
    student_id: { type: DataTypes.INTEGER, allowNull: false },
    subject_id: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    timestamps: true,
  }
);
