// se solicitan modulos nativos de nodeJs
const fs = require("fs");
const path = require("path");

// la constante se coloca en mayuscula para simular que es el constructor de la clase sequeliza
const Sequelize = require("sequelize");

const basename = path.basename(__filename);

// traemos el objeto DB desde environment
const { DB } = require("../config");

const db = {};

// se crea la constante donde se configura la coneccion a la DataBase
const sequelize = new Sequelize(DB.database, DB.username, DB.password, {
  dialect: DB.dialect,
  host: DB.host,
});

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    // const model = sequelize["import"](path.join(__dirname, file));
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// se exporta el objeto sequelize(para coneccion)
db.sequelize = sequelize;
// se exporta el constructor (la unica instancia de la libreria)
db.Sequelize = Sequelize;

module.exports = db;
