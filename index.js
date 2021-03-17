const container = require("./container");
const db = require("./database");

const application = container.resolve("app");

// llamamos el metodo start para iniciar la app
application
  .start()
  .then(() => {
    db.sequelize.sync();
  })
  .catch((err) => console.log(err));
