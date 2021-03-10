require("dotenv").config();

const DEVELOPMENT = require("./enviroment/development");
const PRODUCTION = require("./enviroment/production");

// extraemos la variable de entorno
const { NODE_ENV } = process.env;

// indicamos el ambiente a usar por default
let currentEnv = DEVELOPMENT;

// assignaremos en currentEnv el enviroment en que este NODE_ENV
if (NODE_ENV === "production") {
  currentEnv = PRODUCTION;
}

module.exports = currentEnv;
