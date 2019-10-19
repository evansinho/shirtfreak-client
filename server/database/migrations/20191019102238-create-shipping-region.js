/* eslint-disable quotes */
/* eslint-disable require-jsdoc */
export function up(queryInterface, Sequelize) {
  return queryInterface.createTable("ShippingRegions", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    shipping_region: Sequelize.STRING(100),
    createdAt: {
      type: Sequelize.DATE
    },
    updatedAt: {
      type: Sequelize.DATE
    }
  });
}
export function down(queryInterface) {
  return queryInterface.dropTable("ShippingRegions");
}
