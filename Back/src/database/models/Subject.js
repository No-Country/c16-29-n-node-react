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
    
   return Subject
  };