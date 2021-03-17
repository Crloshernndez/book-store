const container = require("./container");
const db = require("./database");

const application = container.resolve("app");

// llamamos el metodo start para iniciar la app
application
  .start()
  .then(() => {
    db.sequelize.sync();
  })
  .then(() => {
    return db.User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return db.User.create({ name: "Carlos", email: "carlos@gmail.com" });
    }
    return user;
  })
  .catch((err) => console.log(err));
