//importa la conexion a la db
import db from "../database/db.js";
//Importar Sequilize
import { DataTypes } from "sequelize";


const notesModel = db.define('Notes', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    note: { type: DataTypes.STRING },
    is_public: { type: DataTypes.TINYINT(0,1), defaultValue:'0'},
    teacher_id: { type: DataTypes.INTEGER, allowNull: false},
    student_id: { type: DataTypes.INTEGER, allowNull: false},
    subject_id: { type: DataTypes.INTEGER, allowNull: false},
})

export default notesModel