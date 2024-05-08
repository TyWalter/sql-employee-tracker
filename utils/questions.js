// Questions for the user
const questions = [
  {
    type: 'list',
    message: 'What would you like to do?',
    name: 'home',
    choices: ["View All Employees", "Add An Employee", "Update An Employee", "Delete An Employee", "View All Roles", "Add A Role", "Update An Employee Role", "Delete A Role", "View All Departments", "Add A Department", "Delete A Department", "Quit"]
  }
];

// Exporting questions to use the selections on the index.js
module.exports = {
  questions
}