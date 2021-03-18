const express = require("express");
const path = require("path");
const http = require("http");

// clase para el servidor

class Server {
  // se agregan dependencias
  constructor({ config, router, db }) {
    this.db = db;
    this.config = config;
    this.app = express();
    this.app.use(router);

    //indicamos los archivos estaticos
    this.app.use(express.static(path.join(__dirname, "public")));
    //creamos logica para engine template ejs
    this.app.set("view engine", "ejs");
    this.app.set("views", "views");
  }

  start() {
    return new Promise((resolve, reject) => {
      const server = http.createServer(this.app);
      this.db.sequelize
        .sync()
        .then(() => {
          return this.db.User.findByPk(1);
        })
        .then((user) => {
          if (!user) {
            return this.db.User.create({
              name: "Carlos",
              email: "carlos@gmail.com",
            });
          }
          return user;
        })
        .then((user) => {
          user.createCart();
        })
        .then(() => {
          server.listen(this.config.PORT, () => {
            console.log(`Application running on port ${this.config.PORT}`);
            resolve();
          });
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }
}

module.exports = Server;
