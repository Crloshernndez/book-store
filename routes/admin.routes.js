const express = require("express");

module.exports = function ({ adminController }) {
  const router = express.Router();

  router.get("/add-product", adminController.getAddProduct);
  router.get("/products", adminController.getProducts);
  router.get("/edit-product/:productId", adminController.getEditProduct);
  router.post("/edit-product", adminController.editProduct);
  router.post("/add-product", adminController.addProduct);
  router.post("/delete-product", adminController.deleteProduct);

  return router;
};
