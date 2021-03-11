const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

module.exports = function ({
  adminRoutes,
  shopRoutes,
  pageNotFoundController,
}) {
  const router = express.Router();
  const apiRouter = express.Router();

  // indicamos los primeros middlewares
  apiRouter.use(cors()).use(bodyParser.urlencoded({ extended: false }));

  // configuramos las rutas

  apiRouter.use("/admin", adminRoutes);
  apiRouter.use("/", shopRoutes);
  apiRouter.use(pageNotFoundController.getPageNotFound);

  // configuramos la ruta para apiRouter
  router.use("/", apiRouter);
  return router;
};
