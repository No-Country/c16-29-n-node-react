import db  from "../db.js";

import  { UsersModel } from "../models/UsersModel.js";
import  { Mark } from "../models/Mark.js" ;
import { DataTypes } from "sequelize"; 
  
  
  export const Subject =  db.define( "Subject", {
        id: {  type:DataTypes.INTEGER(11), allowNull: false,  primaryKey: true },
        name: {  type:DataTypes.STRING(255), allowNull: false},
        grade: {  type:DataTypes.STRING(255), allowNull: false },
        divition: { type:DataTypes.STRING(255), allowNull: false, },
    },{
        timestamps: false
    });
     // many-to-one association between models
        Subject.belongsTo(UsersModel, { foreignKey: 'teacher_id' });
        Subject.hasMany( Mark , { foreignKey: "subject_id", as:"marks" });
        Subject.belongsToMany(UsersModel,
             { as: "students",
            through: "StudentSubject",
            foreignKey:  "subject_id", 
            otherKey: "student_id"});
        
            Subject.belongsToMany(UsersModel,
                 { as: "teachers",
                through: "TeacherSubject",
                foreignKey:  "subject_id", 
                otherKey: "teacher_id"});

    export default Subject;



