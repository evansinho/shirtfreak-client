/* eslint-disable quotes */
/* eslint-disable require-jsdoc */
export function up(queryInterface, Sequelize) {
  return queryInterface.createTable("Categories", {
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
      type: Sequelize.STRING(1000)
    },
    department_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Departments",
        key: "id",
        as: "department_id"
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
  return queryInterface.dropTable("Categories");
}
