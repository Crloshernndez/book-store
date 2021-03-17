const container = require("./container");
const sequelize = require("./database/models");

const application = container.resolve("app");

// llamamos el metodo start para iniciar la app
application
  .start()
  .then(() => {
    sequelize.sync();
  })
  .catch((err) => console.log(err));
