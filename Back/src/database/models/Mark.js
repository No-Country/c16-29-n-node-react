
import  db  from "../db.js";
  //Importar Sequilize
import { DataTypes } from "sequelize";
import { Association } from "sequelize"; 

  
export const Mark = db.define( "Marks", {
        id: {type: DataTypes.INTEGER(11), primaryKey: true },
        score: { type: DataTypes.INTEGER(11), allowNull: false },
        note: { type: DataTypes.STRING(250), allowNull: false},
        subject_id: {type: DataTypes.INTEGER(11), allowNull: false},
        student_id: {type: DataTypes.INTEGER(11), allowNull: false},
        teacher_id: {type: DataTypes.INTEGER(11), allowNull: false},
        created_at: {type: DataTypes.DATE, allowNull: false},
        updated_at: {type: DataTypes.DATE, allowNull: false},
},{
    timestamps: true
 })
Mark.associations = (models) =>{
    Mark.belongsTo(models.Subject, {foreignKey:'subject_id', as:'subject'});
    Mark.belongsTo(models.UserModel, { foreignKey: 'user_id', as: 'student' });
    Mark.belongsTo(models.UserModel, { foreignKey: 'teacher_id', as: 'teacher' });
}
export default Mark;


