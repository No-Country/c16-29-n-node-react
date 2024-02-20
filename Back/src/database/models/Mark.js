const { config } = require("dotenv");


module.exports = (sequelize, dataTypes) =>{

    alias = "Marks";
    cors = {
        id: { type: dataTypes.INTEGER, primaryKey: true 
    }
};
 const config = {
    dataTable : "Marks",
    timestamps: false
 } 
const Marks = sequelize.define(alias,cors, config);
}
