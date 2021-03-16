module.exports = {
  PORT: process.env.PORT,
  HOST: process.env.HOST,
  // configuracion para DB
  DB: {
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DB_PROD,
    host: process.env.HOST,
    dialect: "mysql",
    // logging: false,
  },
};
