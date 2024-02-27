import db from "../db.js";
import { DataTypes } from "sequelize";
import { BannModel } from "./BannModel.js";
import { ExamModel } from "./ExamModel.js";
import { MarkModel } from "./MarkModel.js";
import { NonAttendanceModel } from "./NonAttendancesModel.js";
import { NoteModel } from "./NoteModel.js";
import { SubjectModel } from "./SubjectModel.js";
import { UserModel } from "./UserModel.js";

const StudentTutorModel = db.define(
  "StudentTutor",
  {
    student_id: { type: DataTypes.INTEGER },
    tutor_id: { type: DataTypes.INTEGER },
  },
  {
    timestamps: true,
  }
);

// User Associations
UserModel.hasMany(BannModel, {
  foreignKey: "teacher_id",
});
UserModel.hasMany(BannModel, {
  foreignKey: "student_id",
});
UserModel.hasMany(NoteModel, {
  foreignKey: "student_id",
});
UserModel.hasMany(NoteModel, {
  foreignKey: "teacher_id",
});
UserModel.hasMany(NonAttendanceModel, {
  foreignKey: "student_id",
});
UserModel.hasMany(ExamModel, {
  foreignKey: "teacher_id",
});
UserModel.hasMany(MarkModel, {
  foreignKey: "student_id",
});
UserModel.belongsToMany(SubjectModel, { through: "UserSubject" });
UserModel.belongsToMany(UserModel, {
  as: "tutor_id",
  through: StudentTutorModel,
  foreignKey: "tutor_id",
});
UserModel.belongsToMany(UserModel, {
  as: "student_id",
  through: StudentTutorModel,
  foreignKey: "student_id",
});

// Subject Associations
SubjectModel.hasMany(BannModel, {
  foreignKey: "subject_id",
});
SubjectModel.hasMany(NoteModel, {
  foreignKey: "subject_id",
});
SubjectModel.hasMany(NonAttendanceModel, { foreignKey: "subject_id" });
SubjectModel.hasMany(ExamModel, { foreignKey: "subject_id" });
SubjectModel.belongsToMany(UserModel, { through: "UserSubject" });

// Notes Associations
NoteModel.belongsTo(UserModel, {
  foreignKey: "student_id",
});
NoteModel.belongsTo(SubjectModel, {
  foreignKey: "subject_id",
});

// NonAttendances Associations
NonAttendanceModel.belongsTo(SubjectModel, {
  foreignKey: "subject_id",
});
NonAttendanceModel.belongsTo(UserModel, {
  foreignKey: "student_id",
});

// Marks Associations
MarkModel.belongsTo(ExamModel, {
  foreignKey: "exam_id",
});
MarkModel.belongsTo(UserModel, {
  foreignKey: "user_id",
});

// Exams Associations
ExamModel.hasOne(MarkModel, {
  foreignKey: "exam_id",
});
ExamModel.belongsTo(SubjectModel, {
  foreignKey: "subject_id",
});
ExamModel.belongsTo(UserModel, {
  foreignKey: "teacher_id",
});

// Banns Associations
BannModel.belongsTo(UserModel, {
  foreignKey: "student_id",
});
BannModel.belongsTo(SubjectModel, {
  foreignKey: "subject_id",
});

export default db;
