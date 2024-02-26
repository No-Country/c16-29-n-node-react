//importa la conexion a la db
import db from "../db.js";
//Importar Sequilize
import { DataTypes } from "sequelize";


export const UsersModel = db.define('Users', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    username: { type: DataTypes.STRING },    
    password: { type: DataTypes.STRING },
    first_name: { type: DataTypes.STRING },
    last_name: { type: DataTypes.STRING},
    role: { type: DataTypes.ENUM('PRINCIPAL', 'TEACHER', 'TUTOR', 'STUDENT'), defaultValue:'STUDENT', allowNull: false}, 
    email: { type: DataTypes.STRING},
    phone: { type: DataTypes.STRING},
    grade: { type: DataTypes.STRING },
    created_at: { type: DataTypes.DATE},
    updated_at: { type: DataTypes.DATE},
},{
    timestamps: false
})

export default UsersModel