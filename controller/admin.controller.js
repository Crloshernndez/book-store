// const Product = require("../models/product.model");

class AdminController {
  constructor() {}

  // metodo para renderizar view add-product => GET
  getAddProduct = (req, res, next) => {
    res.render("admin/add-product", {
      pageTitle: "Add Product",
      path: "/admin/add-product",
    });
  };

  // metodo para traer los productos de la data y renderizar la view products => GET
  getProducts = (req, res, next) => {
    // Product.fetchAll((products) => {
    res.render("admin/products", {
      // prods: products,
      pageTitle: "Admin Products",
      path: "/admin/products",
    });
    // });
  };
}

module.exports = AdminController;
