const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

module.exports = function ({
  adminRoutes,
  shopRoutes,
  pageNotFoundController,
  db,
}) {
  const router = express.Router();
  const apiRouter = express.Router();

  // indicamos los primeros middlewares
  apiRouter.use(cors()).use(bodyParser.urlencoded({ extended: false }));
  apiRouter.use((req, res, next) => {
    db.User.findByPk(1)
      .then((user) => {
        req.user = user;
        next();
      })
      .catch((err) => {
        console.log(err);
      });
  });
  // configuramos las rutas

  apiRouter.use("/admin", adminRoutes);
  apiRouter.use("/", shopRoutes);
  apiRouter.use(pageNotFoundController.getPageNotFound);

  // configuramos la ruta para apiRouter
  router.use("/", apiRouter);
  return router;
};
