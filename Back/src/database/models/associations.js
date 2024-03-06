import db from "../db.js";
import { DataTypes } from "sequelize";
import { BannModel } from "./BannModel.js";
import { ExamModel } from "./ExamModel.js";
import { MarkModel } from "./MarkModel.js";
import { NonAttendanceModel } from "./NonAttendancesModel.js";
import { NoteModel } from "./NoteModel.js";
import { SubjectModel } from "./SubjectModel.js";
import { UserModel } from "./UserModel.js";

export const StudentTutorModel = db.define(
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
  as: "my_banns",
  foreignKey: "teacher_id",
});
UserModel.hasMany(BannModel, {
  as: "banns",
  foreignKey: "student_id",
});
UserModel.hasMany(NoteModel, {
  as: "notes",
  foreignKey: "student_id",
});
UserModel.hasMany(NoteModel, {
  as: "my_notes",
  foreignKey: "teacher_id",
});
UserModel.hasMany(NonAttendanceModel, {
  as: "nonattendances",
  foreignKey: "student_id",
});
UserModel.hasMany(ExamModel, {
  as: "exams",
  foreignKey: "teacher_id",
});
UserModel.hasMany(MarkModel, {
  as: "marks",
  foreignKey: "student_id",
});
UserModel.belongsToMany(SubjectModel, {
  as: "subjects",
  through: "UserSubject" 
});
UserModel.belongsToMany(UserModel, {
  as: "tutors",
  through: StudentTutorModel,
  foreignKey: "student_id",
});
UserModel.belongsToMany(UserModel, {
  as: "students",
  through: StudentTutorModel,
  foreignKey: "tutor_id",
});

// Subject Associations
SubjectModel.hasMany(BannModel, {
  as: "banns",
  foreignKey: "subject_id",
});
SubjectModel.hasMany(NoteModel, {
  as: "notes",
  foreignKey: "subject_id",
});
SubjectModel.hasMany(NonAttendanceModel, { 
  as: "nonattendances",
  foreignKey: "subject_id" 
});
SubjectModel.hasMany(ExamModel, { 
  as: "exams",
  foreignKey: "subject_id" 
});
SubjectModel.belongsToMany(UserModel, {
  as: "users",
  through: "UserSubject" 
});

// Notes Associations
NoteModel.belongsTo(UserModel, {
  as: "teacher",
  foreignKey: "teacher_id",
});
NoteModel.belongsTo(UserModel, {
  as: "student",
  foreignKey: "student_id",
});
NoteModel.belongsTo(SubjectModel, {
  as: "subject",
  foreignKey: "subject_id",
});

// NonAttendances Associations
NonAttendanceModel.belongsTo(SubjectModel, {
  as: "subject",
  foreignKey: "subject_id",
});
NonAttendanceModel.belongsTo(UserModel, {
  as: "student",
  foreignKey: "student_id",
});
NonAttendanceModel.belongsTo(UserModel, {
  as: "teacher",
  foreignKey: "teacher_id",
});

// Marks Associations
MarkModel.belongsTo(ExamModel, {
  as: "exam",
  foreignKey: "exam_id",
});
MarkModel.belongsTo(UserModel, {
  as: "student",
  foreignKey: "user_id",
});

// Exams Associations
ExamModel.hasMany(MarkModel, {
  as: "mark",
  foreignKey: "exam_id",
});
ExamModel.belongsTo(SubjectModel, {
  as: "subject",
  foreignKey: "subject_id",
});
ExamModel.belongsTo(UserModel, {
  as: "teacher",
  foreignKey: "teacher_id",
});

// Banns Associations
BannModel.belongsTo(UserModel, {
  as: "teacher",
  foreignKey: "teacher_id",
});
BannModel.belongsTo(UserModel, {
  as: "student",
  foreignKey: "student_id",
});
BannModel.belongsTo(SubjectModel, {
  as: "subject",
  foreignKey: "subject_id",
});

export default db;
