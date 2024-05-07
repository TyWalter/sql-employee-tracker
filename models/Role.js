const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Setting the class
class Role extends Model {}

// Setting properties of the class
Role.init(
  {
    firstName: {
      type: DataTypes.STRING
    },
    lastName: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    }
  },
  {
    sequelize,
    timestamps: false,
    underscored: true,
    modelName: 'role'
  }
);

// Exporting the class
module.exports = Role;