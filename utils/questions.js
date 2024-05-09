const inquirer = require("inquirer");
const {Pool} = require("pg");
const fs = require("fs").promises;
require('dotenv').config();

// Connect to database
const pool = new Pool(
  {
    user: 'postgres',
    password: '1234',
    host: 'localhost',
    database: 'employee_db'
},
console.log('Connected to the employee_db database!')
);

// Questions for the user
const questions = [
  {
    type: 'list',
    message: 'What would you like to do?',
    name: 'home',
    choices: ["View All Employees", "Add An Employee", "Update An Employee", "Delete An Employee", "View All Roles", "Add A Role", "Update An Employee Role", "Delete A Role", "View All Departments", "Add A Department", "Delete A Department", "Quit"]
  }
];

// Ask question from question.js and redisplay the question after each query is fulfilled
function askQuestion(){
  inquirer.prompt(questions).then(async (answers) => {
    if(answers.home === 'Quit'){
      const data = await fs.readFile('./utils/images/art2.txt', 'utf8');
      console.log(data, `
Goodbye from ASCII Gary`);


    } else if(answers.home === 'View All Employees'){
      pool.query(`SELECT e.id, e.first_name, e.last_name, r.title, d.department_name AS department, r.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
      FROM employees e
      JOIN roles r ON e.role_id = r.id
      JOIN departments d ON r.department_id = d.id
      LEFT JOIN employees AS manager ON e.manager_id = manager.id;`, function (err, {rows}){
        pool.query(console.log(rows));
      })
      askQuestion();


    } else if(answers.home === 'Add An Employee'){
      pool.query('SELECT * FROM employee_db');
      inquirer.prompt(
        {
          type: 'input',
          name: 'addEmployeeFName',
          message: "What is the employee's first name?"
        },
        {
          type: 'input',
          name: 'addEmployeeLName',
          message: "What is the employee's last name?"
        },
        {
          type: 'list',
          name: 'addEmployeeRole',
          message: "What is the employee's role?",
          choices: roles
        },
        {
          type: 'list',
          name: 'addEmployeeManager',
          message: "Who is the employee's manager?",
          choices: employees
        }
      )


      .then(() => {askQuestion()});
    } else if(answers.home === 'Update An Employee'){
      inquirer.prompt({
        type: 'input',
        name: 'updateEmployee',
        message: 'Enter a value related to the selected item:'
      })
      .then((resp) =>
        console.log(resp)
      )
      .then(() => {askQuestion()});


    } else if(answers.home === 'Delete An Employee'){
      inquirer.prompt({
        type: 'input',
        name: 'deleteEmployee',
        message: 'Enter a value related to the selected item:'
      })
      .then(() => {askQuestion()});


    } else if(answers.home === 'View All Roles'){
      console.log("hello");
      askQuestion();


    } else if(answers.home === 'Add A Role'){
      inquirer.prompt({
        type: 'input',
        name: 'addRole',
        message: 'Enter a value related to the selected item:'
      })
      .then(() => {askQuestion()});


    } else if(answers.home === 'Update An Employee Role'){
      inquirer.prompt({
        type: 'input',
        name: 'updateRole',
        message: 'Enter a value related to the selected item:'
      })
      .then(() => {askQuestion()});


    } else if(answers.home === 'Delete A Role'){
      inquirer.prompt({
        type: 'input',
        name: 'deleteEmployee',
        message: 'Enter a value related to the selected item:'
      })
      .then(() => {askQuestion()});


    } else if(answers.home === 'View All Departments'){
      console.log("hello");
      askQuestion();
    } else if(answers.home === 'Add A Department'){
      inquirer.prompt({
        type: 'input',
        name: 'addDepartment',
        message: 'Enter a value related to the selected item:'
      })
      .then(() => {askQuestion()});


    } else if(answers.home === 'Delete A Department'){
      inquirer.prompt({
        type: 'input',
        name: 'deleteDepartment',
        message: 'Enter a value related to the selected item:'
      })
      .then(() => {askQuestion()});
    }          
  });
};

// Exporting questions to use the selections on the index.js
module.exports = {
  questions,
  askQuestion
}