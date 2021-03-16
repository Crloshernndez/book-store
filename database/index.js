// const fs = require("fs");
// const path = require("path");

const Sequelize = require("sequelize");

const { DB } = require("../config");

// const db = {};
// const basename = path.basename(__filename);

// configuracion para conexion con base de datos
const sequelize = new Sequelize(DB.database, DB.username, DB.password, {
  dialect: DB.dialect,
  host: DB.host,
});

// //
// fs.readdirSync(__dirname)
//   .filter((file) => {
//     return (
//       file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
//     );
//   })
//   .forEach((file) => {
//     // const model = sequelize["import"](path.join(__dirname, file));
//     const model = require(path.join(__dirname, file))(
//       sequelize,
//       Sequelize.DataTypes
//     );
//     db[model.name] = model;
//   });

// Object.keys(db).forEach((modelName) => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// // se exporta el objeto sequelize(para coneccion)
// db.sequelize = sequelize;
// // se exporta el constructor (la unica instancia de la libreria)
// db.Sequelize = Sequelize;

module.exports = sequelize;
