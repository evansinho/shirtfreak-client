/* eslint-disable quotes */
/* eslint-disable require-jsdoc */
export function up(queryInterface, Sequelize) {
  return queryInterface.createTable("ShoppingCarts", {
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
    customer_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Customers",
        key: "id",
        as: "customer_id"
      }
    },
    attribute: {
      type: Sequelize.STRING(1000),
      allowNull: false
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    buy_now: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true
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
  return queryInterface.dropTable("ShoppingCarts");
}
