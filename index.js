const inquirer = require("inquirer");
const sequelize = require('./config/connection');
const {questions} = require("./utils/questions");
const fs = require("fs").promises;
// const {Department, Employee, Role} = require("./models");

// Ask question from question.js and redisplay the question after each query is fulfilled
function askQuestion(){
  inquirer.prompt(questions).then(async (answers) => {
    if(answers.home === 'Quit'){
      const data = await fs.readFile('./utils/images/art2.txt', 'utf8');
      console.log(data, `
Goodbye from ASCII Gary`);
    } else if(answers.home === 'View All Employees'){
      console.log("hello");
      askQuestion();
    } else if(answers.home === 'Add An Employee'){
      inquirer.prompt({
        type: 'input',
        name: 'addEmployee',
        message: 'Enter a value related to the selected item:'
      })
      .then(() => {askQuestion()});
    } else if(answers.home === 'Update An Employee'){
      inquirer.prompt({
        type: 'input',
        name: 'updateEmployee',
        message: 'Enter a value related to the selected item:'
      })
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

// Reading the txt file, awaiting the response and then posting the txt file and then running questions
async function start() {
  try {
      const data = await fs.readFile('./utils/images/art.txt', 'utf8');
      console.log(data);
      await askQuestion();
  } catch (err) {
      console.error(err.message);
  }
}

// Calling functions to start
start();