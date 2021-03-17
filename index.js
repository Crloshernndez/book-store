const container = require("./container");

const application = container.resolve("app");

// llamamos el metodo start para iniciar la app
application.start();
