module.exports = {
  PORT: process.env.PORT,
  // configuracion para DB
  DB: {
    username: "root",
    password: process.env.PASSWORD,
    database: process.env.DB_DEV,
    host: process.env.HOST,
    dialect: "mysql",
    // logging: false,
  },
};
