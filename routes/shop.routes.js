const express = require("express");

module.exports = function ({ shopController }) {
  const router = express.Router();

  router.get("/", shopController.getShop);
  router.get("/products", shopController.getProductsList);
  router.get("/cart", shopController.getCart);
  router.get("/orders", shopController.getOrders);
  router.get("/checkout", shopController.getCheckout);

  return router;
};
