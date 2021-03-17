const Product = require("../database/models/product.model");

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
    Product.findAll()
      .then((products) => {
        res.render("admin/products", {
          prods: products,
          pageTitle: "Admin Products",
          path: "/admin/products",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //metodo para obtener un producto por el id = GET
  getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
      return res.redirect("/");
    }
    const prodId = req.params.productId;

    Product.findByPk(prodId)
      .then((product) => {
        if (!product) {
          return res.render("/");
        }
        res.render("admin/form-product", {
          pageTitle: "Edit Product",
          path: "/admin/form-prodcut",
          editing: editMode,
          product: product,
        });
      })
      .catch((err) => console.log(err));
  };

  //metodo para editar producto = POST
  editProduct = (req, res, next) => {
    const prodId = req.body.productId;

    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDescription = req.body.description;
    Product.update(
      {
        title: updatedTitle,
        price: updatedPrice,
        description: updatedDescription,
        imageUrl: updatedImageUrl,
      },
      { where: { id: prodId } }
    )
      .then(() => {
        console.log("Product Updated Successfully");
        res.redirect("/admin/products");
      })
      .catch((err) => console.log(err));
  };

  // metodo para agregar productos a la db = POST
  addProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    Product.create({
      title: title,
      imageUrl: imageUrl,
      price: price,
      description: description,
    })
      .then((result) => {
        console.log("Product Added Successfully");
      })
      .catch((err) => console.log(err));

    res.redirect("/");
  };

  deleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.deleteProductById(prodId);
    res.redirect("/admin/products");
  };
}

module.exports = AdminController;
