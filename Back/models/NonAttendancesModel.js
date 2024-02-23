//importa la conexion a la db
import db from "../database/db.js";
//Importar Sequilize
import { DataTypes } from "sequelize";


const nonAttendancesModel = db.define('Nonttendances', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    type: { type: DataTypes.ENUM('NON_ATTENDANCE', 'DELAYED'), allowNull: true }, 
    date: { type: DataTypes.DATE},
    teacher_id: { type: DataTypes.INTEGER, allowNull: false},
    student_id: { type: DataTypes.INTEGER, allowNull: false},
    subject_id: { type: DataTypes.INTEGER, allowNull: false},
})

export default nonAttendancesModel