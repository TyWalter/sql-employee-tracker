const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Setting the class
class Department extends Model {}

// Setting properties of the class
Department.init(
  {
    departmentName: {
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