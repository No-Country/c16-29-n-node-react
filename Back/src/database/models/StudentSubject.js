import db from "../db.js";
import { DataTypes } from "sequelize";

/* CREATE TABLE `StundentSubjects` (
    `id` int(11) NOT NULL,
    `subject_id` int(11) NOT NULL,
    `student_id` int(11) NOT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
 */
export const StudentSubject = db.define(
  "StudentSubjects",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    subject_id : { type: DataTypes.INTEGER, allowNull: false },
    student_id: { type: DataTypes.INTEGER, allowNull:false },
  },
  {
    timestamps: false,
  }
);