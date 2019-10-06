/* eslint-disable quotes */
export default (sequelize, DataTypes) => {
  const Customer = sequelize.define(
    "Customer",
    {
      name: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false
      }
    },
    {}
  );
  Customer.associate = models => {
    // associations can be defined here
  };
  return Customer;
};
