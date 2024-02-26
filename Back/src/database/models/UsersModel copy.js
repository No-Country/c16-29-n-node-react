//importa la conexion a la db
import db from "../db.js";

export default (sequelize, dataTypes) => {
  let alias = "UsersModel";
  let cols = {
    id: { type: dataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    username: { type: dataTypes.STRING },
    password: { type: dataTypes.STRING },
    first_name: { type: dataTypes.STRING },
    last_name: { type: dataTypes.STRING },
    role: {
      type: dataTypes.ENUM("PRINCIPAL", "TEACHER", "TUTOR", "STUDENT"),
      defaultValue: "STUDENT",
      allowNull: false,
    },
    email: { type: dataTypes.STRING },
    phone: { type: dataTypes.STRING },
    grade: { type: dataTypes.STRING },
    created_at: { type: dataTypes.DATE },
    updated_at: { type: dataTypes.DATE },
  };
  let config = {
    nameTable: "Users",
    timestamps: false,
  };
  const Subject = sequelize.define(alias, cols, config);

  Subject.associate = (models) => {
    // many-to-one association between models
    Subject.belongsTo(models.User, { foreignKey: "teacher_id" });
    Subject.hasMany(models.Mark, { as: "marks" });
    Subject.belogsToMany(models.User, {
      as: "students",
      through: "StudentSubject",
      foreignKey: "subject_id",
      otherKey: "student_id",
    });

    Subject.belogsToMany(models.User, {
      as: "teachers",
      through: "TeacherSubject",
      foreignKey: "subject_id",
      otherKey: "teacher_id",
    });
  };
  return Subject;
};
