//importa la conexion a la db
import db from "../database/db.js";
//Importar Sequilize
import { DataTypes } from "sequelize";


const persModel = db.define('registered_voters', {
    id_number: { type: DataTypes.INTEGER },
    nombre: { type: DataTypes.STRING },
    first_last_name: { type: DataTypes.STRING},
    second_last_name: { type: DataTypes.STRING},
},{
    timestamps: false
})

export default persModel