const Sequelize = require('sequelize');
require('dotenv').config();

// Creating a new Sequelize using the .env to avoid showing password
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PW,
  {
    host: 'localhost',
    dialect: 'postgres'
  }
);

module.exports = sequelize;