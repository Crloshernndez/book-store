const express = require("express");

module.exports = function ({ adminController }) {
  const router = express.Router();

  router.get("/add-product", adminController.getAddProduct);
  router.get("/products", adminController.getProducts);

  return router;
};
