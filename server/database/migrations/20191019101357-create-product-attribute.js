/* eslint-disable quotes */
/* eslint-disable require-jsdoc */
export function up(queryInterface, Sequelize) {
  return queryInterface.createTable("ProductAttributes", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    product_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Products",
        key: "id",
        as: "product_id"
      }
    },
    attribute_value_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "AttributeValues",
        key: "id",
        as: "attribute_value_id"
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
  return queryInterface.dropTable("ProductAttributes");
}
