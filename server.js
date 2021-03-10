const express = require("express");
const path = require("path");
const http = require("http");

// clase para el servidor

class Server {
  // se agregan dependencias
  constructor({ config }) {
    this._config = config;
    this._express = express();

    //indicamos los archivos estaticos
    this._express.use(express.static(path.join(__dirname, "public")));
    //creamos logica para engine template ejs
    this._express.set("view engine", "ejs");
    this._express.set("views", "views");
  }

  start() {
    return new Promise((resolve, reject) => {
      const server = http.createServer(this._express);
      server.listen(this._config.PORT, () => {
        console.log(`Application running on port ${this._config.PORT}`);
        resolve();
      });
    });
  }
}

module.exports = Server;
