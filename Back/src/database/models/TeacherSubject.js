/* CREATE TABLE `TeacherSubjects` (
    `id` int(11) NOT NULL,
    `subject_id` int(11) NOT NULL,
    `teacher_id` int(11) NOT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
   */
  module.exports = ( sequelize , dataTypes) =>{
    let alias = "TeacherSubjects";
    let cols = {
        id: { type: dataTypes.INTEGER(11), allowNull: false},
        subject_id : { type: dataTypes.INTEGER(11), allowNull: false},
        teacher_id : { type: dataTypes.INTEGER(11), allowNull: false},
        
    };
    let config = {
        tableName: "TeacherSubjects",
        timestamps: false,  
        };
        const TeacherSubject =  sequelize.define(alias,cols,config);

        TeacherSubject.associate = (models) =>{
            TeacherSubject.belongsTo( models.Subjects , { foreignKey:'subject_id'});
            TeacherSubject.belongsTo( models.Users , {foreignKey:"teacher_id"})
          }
          return TeacherSubject;
  };