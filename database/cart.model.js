const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    static associate(models) {
      // un cart pertenece a un user
      Cart.belongsTo(models.User);
      // un cart puede pertenecer a varios product
      Cart.belongsToMany(models.Product, {
        through: models.CartItem,
      });
    }
  }

  Cart.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
    },
    {
      sequelize,
      modelName: "Cart",
    }
  );
  return Cart;
};
