const fs = require("fs");
const path = require("path");

const Cart = require("./cart.model");

// path para archivo db
const dbPath = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "products.json"
);

//funcion para obtener los productos desde db
const getProductsFromFile = (callback) => {
  fs.readFile(dbPath, (err, fileContent) => {
    if (err) {
      return callback([]);
    }
    callback(JSON.parse(fileContent));
  });
};

// clase product
module.exports = class Product {
  constructor(id, title, imageUrl, price, description) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
    this.id = id;
  }

  //metodo para guardar producto
  save() {
    // obtenemos la data
    getProductsFromFile((products) => {
      // si el producto existe
      if (this.id) {
        // ubicamos su posicion en el aray de la data
        const existingProductIndex = products.findIndex(
          (prod) => prod.id === this.id
        );

        // guardamos la data en una variable
        const updatedProducts = [...products];
        // actualizamos el producto existente
        updatedProducts[existingProductIndex] = this;
        // actualizamos la db
        fs.writeFile(dbPath, JSON.stringify(updatedProducts), (err) => {
          console.log(err);
        });

        // si el producto no existe
      } else {
        // creamos el id del producto
        this.id = Math.random().toString();
        console.log(this.id);

        // lo agregamos al array de la db
        products.push(this);
        // actualizamos la db
        fs.writeFile(dbPath, JSON.stringify(products), (err) => {
          console.log(err);
        });
      }
    });
  }

  //metodo para obtener todos los productos
  static getProducts(callback) {
    getProductsFromFile(callback);
  }

  //metodo para obtener producto por el id
  static getProductById(id, callback) {
    // obtenemos la data
    getProductsFromFile((products) => {
      //buscamos producto por id y asignamos a una variable
      const product = products.find((p) => p.id === id);

      callback(product);
    });
  }

  // metodo para eliminar producto
  static deleteProductById(id) {
    //obtenemos la data
    getProductsFromFile((products) => {
      //buscamos producto por id y asignamos a una variable
      const product = products.find((prod) => prod.id === id);

      //filtramos la data sacando el producto a eliminar
      const updatedProduct = products.filter((prod) => prod.id !== id);

      //actualizamos la db con la data filtrada
      fs.writeFile(dbPath, JSON.stringify(updatedProduct), (err) => {
        //si no hay error al eliminar producto
        if (!err) {
          // se elimina del cart
          Cart.deleteProduct(id, product.price);
        }
      });
    });
  }
};
