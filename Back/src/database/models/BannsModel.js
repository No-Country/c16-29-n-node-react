//importa la conexion a la db
import db from "../db.js";
//Importar Sequilize
import { DataTypes } from "sequelize";


const bannsModel = db.define('Banns', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    score: { type: DataTypes.ENUM('EXPELLEDEXPELLED', 'SUSPENDED', 'WARNING'), allowNull: false}, 
    note: { type: DataTypes.STRING, allowNull: false},
    teacher_id: { type: DataTypes.INTEGER, allowNull: false},
    student_id: { type: DataTypes.INTEGER, allowNull: false},
    subject_id: { type: DataTypes.INTEGER, allowNull: false},
},{
    timestamps: false
})

export default bannsModel