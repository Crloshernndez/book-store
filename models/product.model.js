const fs = require("fs");
const path = require("path");

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
    getProductsFromFile((products) => {
      this.id = Math.random().toString();
      products.push(this);
      fs.writeFile(dbPath, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }

  //metodo para obtener todos los productos
  static getProducts(callback) {
    getProductsFromFile(callback);
  }

  //metodo para obtener producto por el id
  static getProductById(id, callback) {
    getProductsFromFile((products) => {
      const product = products.find((p) => p.id === id);
      callback(product);
    });
  }

  static deleteProductById(id) {
    getProductsFromFile((products) => {
      const product = products.find((prod) => prod.id === id);
      const updatedProduct = products.filter((prod) => prod.id !== id);
      fs.writeFile(dbPath, JSON.stringify(updatedProduct), (err) => {
        console.log(err);
      });
    });
  }
};
