// const Product = require("../database/product.model");
const Cart = require("../models/cart.model");

class ShopController {
  constructor({ db }) {
    this._db = db;
  }

  // render shop view = GET
  getShop = (req, res, next) => {
    this._db.Product.findAll()
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
    this._db.Product.findAll()
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
    this._db.Product.findByPk(prodId)
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
    req.user
      //obtenemos el cart
      .getCart()
      // con el cart buscamos los productos que hay dentro de el
      .then((cart) => {
        return cart.getProducts();
      })
      .then((products) => {
        console.log(products);

        res.render("shop/cart", {
          pageTitle: "Your Cart",
          path: "/cart",
          products: products,
          // totalPrice: cart.totalPrice,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // render orders view = GET
  getOrders = (req, res, next) => {
    req.user
      .getOrders({ includes: ["Products"] })
      .then((orders) => {
        let order = orders[0];
        return order.getProducts().then((products) => {
          console.log(products);

          res.render("shop/orders", {
            pageTitle: "Your Orders",
            path: "/orders",
            orders: orders,
            products: products,
          });
        });
      })
      .catch((err) => {
        console.log(err);
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
    let newCart;
    let newQuantity = 1;
    // accedemos al cart del usuario
    req.user
      .getCart()
      // accedemos a todos los productos del cart
      .then((cart) => {
        newCart = cart;
        // retornamos los productos que tengan el mismo id que el producto a agregar
        return cart.getProducts({ where: { id: prodId } });
      })
      //si existe asignamos el producto obtenido en una variable
      .then((products) => {
        let product;
        if (products.length > 0) {
          product = products[0];
        }
        // aumentamos quantity del producto
        if (product) {
          const oldQuantity = product.CartItem.quantity;
          newQuantity = oldQuantity + 1;
          return product;
        }
        // si el producto no existe en el cart
        return this._db.Product.findByPk(prodId);
      })
      // agregamos el producto al cart
      .then((product) => {
        return newCart.addProduct(product, {
          // pasamos el valor de newQuantity
          through: {
            quantity: newQuantity,
            price: product.price * newQuantity,
          },
        });
      })
      .then(() => {
        res.redirect("/cart");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  createOrder = (req, res, next) => {
    let cartProducts;
    // obtenemos el cart
    req.user
      .getCart()
      .then((cart) => {
        cartProducts = cart;
        // obtenemos los productos del cart
        return cart.getProducts();
      })
      .then((products) => {
        // se crea la order a travez del user
        return req.user.createOrder().then((order) => {
          // agregamos los productos del cart a la order
          return order.addProducts(
            // mapeamos los productos para obtener quantity
            products.map((product) => {
              product.OrderItem = {
                quantity: product.CartItem.quantity,
                cost: product.CartItem.price,
              };
              return product;
            })
          );
        });
      })
      .then(() => {
        // vaciamos el cart
        cartProducts.setProducts(null);
        res.redirect("/orders");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // metodo para eliminar producto del cart = POST
  deleteProductCart = (req, res, next) => {
    const prodId = req.body.productId;
    req.user
      .getCart()
      .then((cart) => {
        return cart.getProducts({ where: { id: prodId } });
      })
      .then((products) => {
        const product = products[0];
        return product.CartItem.destroy();
      })
      .then(() => {
        res.redirect("/cart");
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

module.exports = ShopController;
