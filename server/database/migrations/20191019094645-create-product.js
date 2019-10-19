/* eslint-disable quotes */
/* eslint-disable require-jsdoc */
export function up(queryInterface, Sequelize) {
  return queryInterface.createTable("Products", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    description: {
      type: Sequelize.STRING(1000),
      allowNull: false
    },
    price: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false
    },
    discounted_price: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0
    },
    image: {
      type: Sequelize.STRING(150)
    },
    image_2: {
      type: Sequelize.STRING(150)
    },
    thumbnail: {
      type: Sequelize.STRING(150)
    },
    display: {
      type: Sequelize.INTEGER(6),
      allowNull: false,
      defaultValue: 0
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
  return queryInterface.dropTable("Products");
}
