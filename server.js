const express = require("express");
const path = require("path");
const http = require("http");

// clase para el servidor

class Server {
  // se agregan dependencias
  constructor({ config, router }) {
    this._config = config;
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
      server.listen(this._config.PORT, () => {
        console.log(`Application running on port ${this._config.PORT}`);
        resolve();
      });
    });
  }
}

module.exports = Server;
