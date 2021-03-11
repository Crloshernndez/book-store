const Product = require("../models/product.model");

class AdminController {
  constructor() {}

  // metodo para renderizar view add-product => GET
  getAddProduct = (req, res, next) => {
    res.render("admin/form-product", {
      pageTitle: "Add Product",
      path: "/admin/form-product",
      editing: false,
    });
  };

  // metodo para traer los productos de la data y renderizar la view products => GET
  getProducts = (req, res, next) => {
    Product.getProducts((products) => {
      res.render("admin/products", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/products",
      });
    });
  };

  //metodo para obtener un producto por el id = GET
  getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
      return res.redirect("/");
    }
    const prodId = req.params.productId;
    Product.getProductById(prodId, (product) => {
      if (!product) {
        return res.render("/");
      }
      res.render("admin/form-product", {
        pageTitle: "Edit Product",
        path: "/admin/form-prodcut",
        editing: editMode,
        product: product,
      });
    });
  };

  // metodo para agregar productos a la db = POST
  addProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product(null, title, imageUrl, price, description);
    product.save();
    res.redirect("/");
  };
}

module.exports = AdminController;
