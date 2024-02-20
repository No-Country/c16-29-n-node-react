/* CREATE TABLE `StudentSubjects` (
    `id` int(11) NOT NULL,
    `subject_id` int(11) NOT NULL,
    `student_id` int(11) NOT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
   */
module.exports = (sequelize, dataTypes) =>{

    let alias = "StudentSubject";
    let cols = {
        id:  dataTypes.INTEGER, primaryKey: true, primaryKey: true,
        subjectId:  dataTypes.INTEGER,
        studentId: dataTypes.STRING
    };
    const config = {
       dataTable : "StudentSubjects",
       timestamps: false
    };
    const StudentSubject = sequelize.define(alias,cols, config);
    
    StudentSubject.associate = (models) =>{
        StudentSubject.belongsTo(models.Subjects, {foreignKey:"subjectId"});
        StudentSubject.belongsTo(models.Users, {as:"student", foreignKey:"student_id"});
    }
    return StudentSubject;
};


