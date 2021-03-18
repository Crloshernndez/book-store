const express = require("express");

module.exports = function ({ shopController }) {
  const router = express.Router();

  router.get("/", shopController.getShop);
  router.get("/products", shopController.getProductsList);
  router.get("/products/:productId", shopController.getProduct);
  router.get("/cart", shopController.getCart);
  router.get("/orders", shopController.getOrders);
  router.get("/checkout", shopController.getCheckout);
  router.post("/cart", shopController.addToCart);
  router.post("/cart-delete-item", shopController.deleteProductCart);
  router.post("/create-order", shopController.createOrder);

  return router;
};
