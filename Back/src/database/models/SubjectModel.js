import db from "../db.js";
import { DataTypes } from "sequelize";

export const SubjectModel = db.define(
  "Subjects",
  {
    id: { type: DataTypes.INTEGER(11), allowNull: false, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(255), allowNull: false },
    grade: { type: DataTypes.STRING(255), allowNull: false },
    divition: { type: DataTypes.STRING(255), allowNull: false },
    fullName: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.name} ${this.grade}° ${this.divition}`;
      },
      set(value) {
        throw new Error('Do not try to set the `fullName` value!');
      }
    },
  },
  {
    timestamps: true,
  }
);
