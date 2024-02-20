/* CREATE TABLE `StudentsTutors` (
    `student_id` int(11) DEFAULT NULL,
    `tutor_id` int(11) DEFAULT NULL,
    `id` int(11) NOT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
   */
  module.exports = (sequelize, dataTypes) =>{

    let alias = "StudentTutor";
    let cols = {
        id:  { type: dataTypes.INTEGER(11), allowNull:false, primaryKey: true,},
        student_id: { type: dataTypes.INTEGER(11), allowNull: false },
        tutor_id:  { type:  dataTypes.INTEGER(11), allowNull: flase },
    };
    const config = {
       tableName : "StudentsTutors",
       timestamps: false
    };
    const StudentTutor = sequelize.define(alias,cols, config);

    StudentTutor.associate = (models) =>{
        StudentTutor.belongsTo(models.Users, { foreignKey:"student_id"});
        StudentTutor.belongsTo(models.Users, { as: 'supervisor', foreignKey: 'tutor_id'});
    }
 }    
    return StudentTutor;
};