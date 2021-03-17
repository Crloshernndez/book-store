const Sequelize = require("sequelize");
const { DB } = require("../config");

const sequelize = new Sequelize(DB.database, DB.username, DB.password, {
  dialect: DB.dialect,
  host: DB.host,
});

module.exports = sequelize;
