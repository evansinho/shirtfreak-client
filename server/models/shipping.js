/* eslint-disable quotes */
export default (sequelize, DataTypes) => {
  const Shipping = sequelize.define(
    "Shipping",
    {
      shipping_type: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      shipping_cost: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 10.0
      },
      shipping_region_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {}
  );
  Shipping.associate = models => {
    Shipping.belongsTo(models.ShippingRegion, {
      foreignKey: "shipping_region_id"
    });
  };
  return Shipping;
};
