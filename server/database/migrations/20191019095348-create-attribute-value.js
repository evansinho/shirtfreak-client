/* eslint-disable quotes */
/* eslint-disable require-jsdoc */
export function up(queryInterface, Sequelize) {
  return queryInterface.createTable("AttributeValues", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    value: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    attribute_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Attributes",
        key: "id",
        as: "attribute_id"
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
  return queryInterface.dropTable("AttributeValues");
}
