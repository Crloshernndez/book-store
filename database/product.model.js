const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      // un producto le puede pertenecer a varios usuarios
      Product.belongsTo(models.User, {
        constraints: true,
        onDelete: "CASCADE",
      });
      // un product puede pertenecer a varios cart
      Product.belongsToMany(models.Cart, {
        through: models.CartItem,
      });
      Product.belongsToMany(models.Order, {
        through: models.OrderItem,
      });
    }
  }
  Product.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
