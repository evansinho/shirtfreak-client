/* eslint-disable quotes */
export default (sequelize, DataTypes) => {
  const OrderDetail = sequelize.define(
    "OrderDetail",
    {
      order_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      attribute: {
        type: DataTypes.STRING(1000),
        allowNull: false
      },
      product_name: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
      },
      unit_cost: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      }
    },
    {}
  );
  OrderDetail.associate = models => {
    OrderDetail.belongsTo(models.Order, {
      foreignKey: "order_id"
    });
  };
  return OrderDetail;
};
