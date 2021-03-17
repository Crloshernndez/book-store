const { asClass, asFunction, asValue, createContainer } = require("awilix");

// app start
const Startup = require("./startup");
const Serve = require("./server");
const config = require("./config");

// rutas
const Routes = require("./routes");
const AdminRoutes = require("./routes/admin.routes");
const ShopRoutes = require("./routes/shop.routes");

// controllers
const AdminController = require("./controller/admin.controller");
const ShopController = require("./controller/shop.controller");
const PageNotFoundController = require("./controller/notFountPage.controller");

// database
const db = require("./database");

// se crea el container parainyeccion de dependencias
const container = createContainer();

container
  .register({
    app: asClass(Startup).singleton(),
    server: asClass(Serve).singleton(),
    config: asValue(config),
  })

  // registro para las rutas
  .register({
    router: asFunction(Routes).singleton(),
    adminRoutes: asFunction(AdminRoutes).singleton(),
    shopRoutes: asFunction(ShopRoutes),
  })

  // registro de controllers
  .register({
    adminController: asClass(AdminController).singleton(),
    shopController: asClass(ShopController).singleton(),
    pageNotFoundController: asClass(PageNotFoundController).singleton(),
  })
  // registro de database
  .register({
    db: asValue(db),
  });

module.exports = container;
