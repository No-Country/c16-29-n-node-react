/* CREATE TABLE `StudentSubjects` (
    `id` int(11) NOT NULL,
    `subject_id` int(11) NOT NULL,
    `student_id` int(11) NOT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
   */
module.exports = (sequelize, dataTypes) =>{

    let alias = "StudentSubject";
    let cols = {
        id: {type: dataTypes.INTEGER, primaryKey: true, primaryKey: true, },
        subject_id: {type: dataTypes.INTEGER(11), allowNull: false },
        student_id: {type:  dataTypes.INTEGER(11), allowNull: false},
    };
    const config = {
       dataTable : "StudentSubjects",
       timestamps: false
    };
    const StudentSubject = sequelize.define(alias,cols, config);
    StudentSubject.associate = (models) =>{
        StudentSubject.belongsTo( models.Subject , { foreignKey:'subject_id'});
        StudentSubject.belongsTo( models.User , {foreignKey:"student_id"})
      }
    return StudentSubject;
};


