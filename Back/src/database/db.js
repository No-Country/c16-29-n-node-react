import { DB_HOST, DB_DATABASE, DB_USER, DB_PASSWORD } from "../../d_config.js";
import { Sequelize } from "sequelize";

const db = new Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "mysql",
});

export default db;
