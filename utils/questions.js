// Questions for the user
const questions = [
  {
    type: 'list',
    message: 'What would you like to do?',
    name: 'home',
    choices: ["View All Employees", "Add An Employee", "Update An Employee", "Delete An Employee", "View All Roles", "Add A Role", "Update An Employee Role", "Delete A Role", "View All Departments", "Add A Department", "Delete A Department"]
  },
  {
    when: (answers) => {
      if(answers.home === 'View All Employees'){
        console.log("Hello")
      }
    }
  },
  {
    type: 'input',
    name: 'addEmployee',
    message: 'Enter a value related to the selected item:',
    when: (answers) => {
      if(answers.home === 'Add An Employee'){

      }
    }
  },
  {
    type: 'input',
    name: 'updateEmployee',
    message: 'Enter a value related to the selected item:',
    when: (answers) => {
      if(answers.home === 'Update An Employee'){

      }
    }
  },
  {
    type: 'input',
    name: 'deleteEmployee',
    message: 'Enter a value related to the selected item:',
    when: (answers) => {
      if(answers.home === 'Delete An Employee'){

      }
    }
  },
  {
    when: (answers) => {
      if(answers.home === 'View All Roles'){

      }
    }
  },
  {
    type: 'input',
    name: 'addRole',
    message: 'Enter a value related to the selected item:',
    when: (answers) => {
      if(answers.home === 'Add A Role'){

      }
    }
  },
  {
    type: 'input',
    name: 'updateRole',
    message: 'Enter a value related to the selected item:',
    when: (answers) => {
      if(answers.home === 'Update An Employee Role'){

      }
    }
  },
  {
    type: 'input',
    name: 'deleteRole',
    message: 'Enter a value related to the selected item:',
    when: (answers) => {
      if(answers.home === 'Delete A Role'){

      }
    }
  },
  {
    when: (answers) => {
      if(answers.home === 'View All Department'){

      }
    }
  },
  {
    type: 'input',
    name: 'addDepartment',
    message: 'Enter a value related to the selected item:',
    when: (answers) => {
      if(answers.home === 'Add A Department'){

      }
    }
  },
  {
    type: 'input',
    name: 'deleteDepartment',
    message: 'Enter a value related to the selected item:',
    when: (answers) => {
      if(answers.home === 'Delete A Department'){

      }
    }
  }
];

// Exporting questions to use the selections on the index.js
module.exports = {
  questions
}