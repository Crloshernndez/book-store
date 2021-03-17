const Product = require("../database/models/product.model");
const Cart = require("../models/cart.model");

class ShopController {
  constructor() {}

  // render shop view = GET
  getShop = (req, res, next) => {
    Product.findAll()
      .then((products) => {
        res.render("shop/shop", {
          prods: products,
          pageTitle: "Shop",
          path: "/",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // render product-list view = GET
  getProductsList = (req, res, next) => {
    Product.findAll()
      .then((products) => {
        res.render("shop/product-list", {
          prods: products,
          pageTitle: "Shop",
          path: "/products",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //metodo para obtener un producto por el id = GET
  getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findByPk(prodId)
      .then((product) => {
        res.render("shop/product-details", {
          product: product,
          pageTitle: product.title,
          path: "/products",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // metodo para traer los productos de la data y renderizar la view cart = GET
  getCart = (req, res, next) => {
    Cart.getCart((cart) => {
      Product.getProducts((products) => {
        const cartProducts = [];
        for (let product of products) {
          const cartProductData = cart.products.find(
            (prod) => prod.id === product.id
          );
          if (cartProductData) {
            cartProducts.push({
              productData: product,
              quantity: cartProductData.quantity,
              priceProducts: product.price * cartProductData.quantity,
            });
          }
        }

        res.render("shop/cart", {
          pageTitle: "Your Cart",
          path: "/cart",
          products: cartProducts,
          totalPrice: cart.totalPrice,
        });
      });
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

  // metodo para agregar productos al cart = POST
  addToCart = (req, res, next) => {
    const prodId = req.body.productId;

    Product.getProductById(prodId, (product) => {
      Cart.addProductToCart(prodId, product.price);
    });
    res.redirect("/cart");
  };

  // metodo para eliminar producto del cart = POST
  deleteProductCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.getProductById(prodId, (product) => {
      Cart.deleteProductFromCart(prodId, product.price);
      res.redirect("/cart");
    });
  };
}

module.exports = ShopController;
