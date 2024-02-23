/* CREATE TABLE `Subjects` (
    `id` int(11) NOT NULL,
    `name` varchar(255) NOT NULL,
    `grade` varchar(255) NOT NULL,
    `divition` varchar(255) NOT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
   */
  module.exports = ( sequelize, dataTypes )=> {
    let alias ="Subject";
    let cols = {
        id: {  type:dataTypes.INTEGER(11), allowNull: false,  primaryKey: true },
        name: {  type:dataTypes.STRING(255), allowNull: false},
        grade: {  type:dataTypes.STRING(255), allowNull: false },
        divition: {  type:dataTypes.STRING(255), allowNull: false, },
    }
    let config = {
        nameTable : "Subjects",
        timestamps: false
    };
    const Subject = sequelize.define( alias , cols, config);

    Subject.associate = (models) =>{
        // many-to-one association between models
        Subject.belongsTo(models.User, { foreignKey: 'teacher_id' });
        Subject.hasMany(models.Mark, { as:"marks"});
        Subject.belogsToMany(models.User,
             { as: "students",
            through: "StudentSubject",
            foreignKey:  "subject_id", 
            otherKey: "student_id"});
        
            Subject.belogsToMany(models.User,
                 { as: "teachers",
                through: "TeacherSubject",
                foreignKey:  "subject_id", 
                otherKey: "teacher_id"});
    };
    return Subject;
};


