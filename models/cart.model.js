const fs = require("fs");
const path = require("path");

// path para archivo db
const dbPath = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "cart.json"
);

module.exports = class Cart {
  // metodo para agregar productos al cart
  static addProductToCart(id, productPrice) {
    // obtenemos data
    fs.readFile(dbPath, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };

      // si no hay error existe data
      if (!err) {
        //la parseamos y guardamos en variable cart
        cart = JSON.parse(fileContent);
      }

      // verificar si el producto existe
      ////obtenemos la posicion del producto existente en el array
      const existingProductsIndex = cart.products.findIndex((p) => p.id === id);

      const existingProduct = cart.products[existingProductsIndex];
      let updatedProduct;

      // si el producto existe
      if (existingProduct) {
        //guardamos el producto en una variable
        updatedProduct = { ...existingProduct };
        // aumentamos la cantidad
        updatedProduct.quantity = updatedProduct.quantity + 1;
        cart.products = [...cart.products];
        // reemplazamos el producto existente por el producto actualizado
        cart.products[existingProductsIndex] = updatedProduct;

        // si el producto es nuevo
      } else {
        // guardamos el producto agregado n una variable con la cantidad 1
        updatedProduct = { id: id, quantity: 1 };
        // agregamos el producto al array de productos
        cart.products = [...cart.products, updatedProduct];
      }

      // logica para el totalPrice
      cart.totalPrice = cart.totalPrice + +productPrice;

      //actializamos la db
      fs.writeFile(dbPath, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }

  // metodo para eliminar productos del cart
  static deleteProductFromCart(id, productPrice) {
    // obtenemos data
    fs.readFile(dbPath, (err, fileContent) => {
      // si existe error no hay data
      if (err) {
        return;
      }

      // guardamos la data en una variable
      const updatedCart = { ...JSON.parse(fileContent) };

      // analizamos si el producto existe
      const product = updatedCart.products.find((prod) => prod.id === id);
      if (!product) {
        return;
      }

      //si existe el producto
      const productQty = product.quantity;
      //filtramos la data
      updatedCart.products = updatedCart.products.filter(
        (prod) => prod.id !== id
      );

      //actualizamos totalPrice
      updatedCart.totalPrice =
        updatedCart.totalPrice - productPrice * productQty;

      //actualizamos la db
      fs.writeFile(dbPath, JSON.stringify(updatedCart), (err) => {
        console.log(err);
      });
    });
  }

  // metodo para obtener productos del cart
  static getCart(callback) {
    //obtenemos la data
    fs.readFile(dbPath, (err, fileContent) => {
      // guardamos la data parseada en una variable
      const cart = JSON.parse(fileContent);
      // si existe error no hay data
      if (err) {
        callback(null);
      } else {
        callback(cart);
      }
    });
  }
};
