/* CREATE TABLE `Marks` (
    `id` int(11) NOT NULL,
    `score` int(11) NOT NULL,
    `note` varchar(255) DEFAULT NULL,
    `subject_id` int(11) NOT NULL,
    `student_id` int(11) NOT NULL,
    `teacher_id` int(11) NOT NULL,
    `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
  ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
   */

  
export default (sequelize, dataTypes) =>{

    let alias = "Mark";
    let  cols = {
        id: { type: dataTypes.INTEGERI(11), primaryKey: true },
        score: { type: dataTypes.INTEGER(11), allowNull: false },
        note: { type: dataTypes.STRING(250), allowNull: false},
        subject_id: {type: dataTypes.INTEGER(11), allowNull: false},
        student_id: {type: dataTypes.INTEGER(11), allowNull: false},
        teacher_id: {type: dataTypes.INTEGER(11), allowNull: false},
        created_at: {type: dataTypes.DATE, allowNull: false},
        updated_at: {type: dataTypes.DATE, allowNull: false},
};
 const config = {
    tableName : "Marks",
    timestamps: true
 } 
const Mark = sequelize.define(alias,cols, config);

Mark.associate = (models) =>{
    Mark.belongsTo(models.Subject, {foreignKey:'subject_id', as:'subject'});
    Mark.belongsTo(models.UserModel, { foreignKey: 'user_id', as: 'student' });
    Mark.belongsTo(models.UserModel, { foreignKey: 'teacher_id', as: 'teacher' });
}

return Mark;
}


