/* eslint-disable quotes */
/* eslint-disable require-jsdoc */
export function up(queryInterface, Sequelize) {
  return queryInterface.createTable("Shippings", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    shipping_type: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    shipping_cost: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 10
    },
    shipping_region_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "ShippingRegions",
        key: "id",
        as: "shipping_region_id"
      }
    },
    createdAt: {
      type: Sequelize.DATE
    },
    updatedAt: {
      type: Sequelize.DATE
    }
  });
}
export function down(queryInterface) {
  return queryInterface.dropTable("Shippings");
}
