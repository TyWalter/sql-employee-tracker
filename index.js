const inquirer = require("inquirer");
const sequelize = require('./config/connection');
const {questions} = require("./utils/questions");
const {Department, Employee, Role} = require("./models");

