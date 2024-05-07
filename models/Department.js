const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Setting the class
class Department extends Model {}

// Setting properties of the class
Department.init(
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
    modelName: 'department'
  }
);

// Exporting the class
module.exports = Department;