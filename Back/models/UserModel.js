//importa la conexion a la db
import db from "../database/db.js";
//Importar Sequilize
import { DataTypes } from "sequelize";


export const UserModel = db.define('Users', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    username: { type: DataTypes.STRING },    
    password: { type: DataTypes.STRING },
    first_name: { type: DataTypes.STRING },
    last_name: { type: DataTypes.STRING},
    role: { type: DataTypes.ENUM('PRINCIPAL', 'TEACHER', 'TUTOR', 'STUDENT'), defaultValue:'STUDENT', allowNull: false}, 
    email: { type: DataTypes.STRING},
    phone: { type: DataTypes.STRING},
    created_at: { type: DataTypes.timestamps},
    updated_at: { type: DataTypes.timestamps},
})
