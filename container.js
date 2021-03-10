const { asClass, asFunction, asValue, createContainer } = require("awilix");

// app start
const Startup = require("./startup");
const Serve = require("./server");
const config = require("./config");

// se crea el container parainyeccion de dependencias
const container = createContainer();

container.register({
  app: asClass(Startup).singleton(),
  server: asClass(Serve).singleton(),
  config: asValue(config),
});

module.exports = container;
