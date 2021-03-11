// const Product = require("../models/product.model");

class ShopController {
  constructor() {}

  // render shop view = GET
  getShop = (req, res, next) => {
    //   Product.fetchAll((products) => {
    res.render("shop/shop", {
      prods: [],
      pageTitle: "Shop",
      path: "/",
    });
    //   });
  };
  // render product-list view = GET
  getProductsList = (req, res, next) => {
    // Product.fetchAll((products) => {
    res.render("shop/product-list", {
      // prods: products,
      pageTitle: "All Products",
      path: "/products",
    });
    // });
  };

  // render cart view = GET
  getCart = (req, res, next) => {
    res.render("shop/cart", {
      pageTitle: "Your Cart",
      path: "/cart",
    });
  };

  // render orders view = GET
  getOrders = (req, res, next) => {
    res.render("shop/orders", {
      pageTitle: "Your Orders",
      path: "/orders",
    });
  };

  // render checkout view = GET
  getCheckout = (req, res, next) => {
    res.render("shop/checkout", {
      pageTitle: "Checkout",
      path: "/checkout",
    });
  };
}

module.exports = ShopController;
