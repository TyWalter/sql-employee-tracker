const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Setting the class
class Role extends Model {}

// Setting properties of the class
Role.init(
  {
    title: {
      type: DataTypes.STRING
    },
    salary: {
      type: DataTypes.INTEGER
    },
    department_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "department",
        key: "id"
      }
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