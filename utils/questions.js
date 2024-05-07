const inquirer = require("inquirer");

// Questions for the user
const questions = (callback) => inquirer.prompt([
  {
    type: 'input',
    message: 'What is the title of your README?',
    name: 'title'
  },
  {
    type: 'input',
    message: 'What is the decription of your application?',
    name: 'description'
  },
  {
    type: 'input',
    message: 'How is this application meant to be used?',
    name: 'usage'
  },
  {
    type: 'input',
    message: 'How do you install this application?',
    name: 'install'
  },
  {
    type: 'input',
    message: 'How do you test the application?',
    name: 'test'
  },
  {
    type: 'input',
    message: 'Did anyone help contribute to this application?',
    name: 'cont'
  },
  {
    type: 'input',
    message: 'What is your GitHub username?',
    name: 'username'
  },
  {
    type: 'input',
    message: 'What e-mail address can you be reached at?',
    name: 'email'
  },
  {
    type: 'list',
    message: 'What license would you like to use for your application?',
    name: 'license',
    choices: ["No License", "Apache 2.0", "Boost Software v1.0", "BSD 2-Clause 'Simplified'", "BSD 3-Clause 'New' or 'Revised'", "Creative Commons Zero v1.0", "Eclipse Public v2.0", "GNU Affero General Public v3.0", "GNU General Public v3.0", "MIT", "Mozilla Public v2.0"]
  }
]).then((resp) => {
  callback(resp);
});

// Exporting questions to use the selections on the index.js
module.exports = {
  questions
}