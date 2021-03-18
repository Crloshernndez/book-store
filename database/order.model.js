const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      // una order le pertenece a un user
      Order.belongsTo(models.User);
      // una order puede pertenecer a varios productos
      Order.belongsToMany(models.Product, { through: models.OrderItem });
    }
  }

  Order.init(
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
      modelName: "Order",
    }
  );
  return Order;
};
