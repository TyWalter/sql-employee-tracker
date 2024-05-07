const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Setting the class
class Employee extends Model {}

// Setting properties of the class
Employee.init(
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
    modelName: 'employee'
  }
);

// Exporting the class
module.exports = Employee;