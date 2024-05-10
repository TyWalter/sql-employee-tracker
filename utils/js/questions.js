const inquirer = require("inquirer");
const {Pool} = require("pg");
const fs = require("fs").promises;
const cTable = require("console.table");

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
    choices: ["View All Employees", "Add An Employee", "Delete An Employee", "View All Roles", "Add A Role", "Delete A Role", "Update An Employee Role", "View All Departments", "Add A Department", "Delete A Department", "Quit"]
  }
];

// Ask question from question.js and redisplay the question after each query is fulfilled
function askQuestion(){
  inquirer.prompt(questions).then(async (answers) => {
    if(answers.home === 'Quit'){
      const data = await fs.readFile('./utils/images/art2.txt', 'utf8');
      console.log(data, `
                      
                      Goodbye`
      );
    } else if(answers.home === 'View All Employees'){
      pool.query(`SELECT e.id, e.first_name, e.last_name, r.title, d.department_name AS department, r.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employees e LEFT JOIN roles r ON e.role_id = r.id LEFT JOIN departments d ON r.department_id = d.id LEFT JOIN employees AS manager ON e.manager_id = manager.id;`, (err, {rows}) => {
        if(err) {
          console.log(err.message);
        } else {
          console.table(rows)
          askQuestion();
        };
      });
    } else if(answers.home === 'Add An Employee'){
      pool.query('SELECT * FROM roles', (err, {rows}) => {
        if(err) {
          console.log(err.message)
        } else {
          const roleChoices = rows.map(role => ({
            name: role.title,
            value: role.id
          }));
          pool.query('SELECT * FROM employees', (err, {rows}) => {
            if(err){
              console.log(err.message)
            } else {
              const empChoices = rows.map(emp => ({
                name: emp.first_name + " " + emp.last_name,
                value: emp.id
              }));
              inquirer.prompt([
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
                  choices: roleChoices
                },
                {
                  type: 'list',
                  name: 'addEmployeeManager',
                  message: "Who is the employee's manager?",
                  choices: ["None", ...empChoices]
                }
              ])
              .then(resp => {
                if(resp.addEmployeeManager === "None"){
                  const lead = null
                  pool.query(`INSERT into employees(first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)`, [resp.addEmployeeFName, resp.addEmployeeLName, resp.addEmployeeRole, lead], (err) => {
                    if(err){
                      console.log(err.message);
                    } else {
                      console.log(`Added ${resp.addEmployeeFName + " " + resp.addEmployeeLName} to the database`);
                      askQuestion();
                    };
                  });
                } else {
                  pool.query(`INSERT into employees(first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)`, [resp.addEmployeeFName, resp.addEmployeeLName, resp.addEmployeeRole, resp.addEmployeeManager], (err) => {
                    if(err){
                      console.log(err.message);
                    } else {
                      console.log(`Added ${resp.addEmployeeFName + " " + resp.addEmployeeLName} to the database`);
                      askQuestion();
                    };
                  });
                }
              });
            };
          });
        };
      });
    } else if(answers.home === 'Delete An Employee'){
      pool.query('SELECT * FROM employees', (err, {rows}) => {
        if(err) {
          console.log(err.message);
        } else {
          const empChoices = rows.map(emp => ({
            name: emp.first_name + " " + emp.last_name,
            value: [emp.id, emp.first_name + " " + emp.last_name, emp.role_id, emp.department_id]
          }));
          inquirer.prompt({
            type: 'list',
            name: 'deleteEmployee',
            message: 'Which employee would you like to remove?',
            choices: empChoices
          })
          .then(resp => {
            pool.query(`DELETE FROM employees WHERE id = ${resp.deleteEmployee[0]};`);
            console.log(`Removed ${resp.deleteEmployee[1]} from the database`)
            askQuestion();
          });
        };
      });
    } else if(answers.home === 'View All Roles'){
      pool.query(`SELECT r.id, r.title, d.department_name AS department, r.salary FROM roles r LEFT JOIN departments d ON r.department_id = d.id;`, (err, {rows}) => {
        if(err) {
          console.log(err.message);
        } else {
          console.table(rows)
          askQuestion();
        };
      });
    } else if(answers.home === 'Add A Role'){
      pool.query('SELECT * FROM departments', (err, {rows}) => {
        if(err){
          console.log(err.message);
        } else {
          const deptChoices = rows.map(dept => ({
            name: dept.department_name,
            value: dept.id
          }));
          inquirer.prompt([
            {
              type: 'input',
              name: 'addRoleTitle',
              message: 'What is the name of the role?'
            },
            {
              type: 'input',
              name: 'addRoleSalary',
              message: 'What is the salary of the role?'
            },
            {
              type: 'list',
              name: 'addRoleDepartment',
              message: 'Which department does the role belong to?',
              choices: deptChoices
            }
          ])
          .then(resp => {
            pool.query(`INSERT INTO roles(title, salary, department_id) VALUES ($1, $2, $3)`, [resp.addRoleTitle, resp.addRoleSalary, resp.addRoleDepartment], (err) => {
              if (err){
                console.log(err.message);
              } else {
                console.log(`Added ${resp.addRoleTitle} to the database`);
                askQuestion();
              };
            });
          });
        };
      });
    } else if(answers.home === 'Update An Employee Role'){
      pool.query('SELECT * FROM employees;', (err, {rows}) => {
        if(err) {
          console.log(err.message);
        } else {
          const employeeChoices = rows.map(employee => ({
            name: employee.first_name + " " + employee.last_name,
            value: [employee.id, employee.first_name + " " + employee.last_name, employee.role_id, employee.department_id]
          }));
          pool.query('SELECT * FROM roles;', (err, {rows}) => {
            if(err){
              console.log(err.message)
            } else {
              const roleChoices = rows.map(role => ({
                name: role.title,
                value: [role.id, role.title, role.salary, role.department_id]
              }));
              inquirer.prompt([
                {
                  type: 'list',
                  name: 'updateRoleEmployee',
                  message: "Which employee's role do you want to update?",
                  choices: employeeChoices
                },
                {
                  type: 'list',
                  name: 'updateRoleEmployeeRole',
                  message: "Which role do you want to assign to the selected employee?",
                  choices: roleChoices
                }
              ])
              .then(resp => {
                pool.query(`UPDATE employees SET role_id = ${resp.updateRoleEmployeeRole[0]} WHERE id = ${resp.updateRoleEmployee[0]};`);
                console.log(`Updated ${resp.updateRoleEmployee[1]}'s role to ${resp.updateRoleEmployeeRole[1]} from the database`);
                askQuestion();
              });
            };
          });
        };
      });
    } else if(answers.home === 'Delete A Role'){
      pool.query('SELECT * FROM roles', (err, {rows}) => {
        if(err) {
          console.log(err.message);
        } else {
          const roleChoices = rows.map(role => ({
            name: role.title,
            value: [role.id, role.title, role.salary, role.department_id]
          }));
          inquirer.prompt({
            type: 'list',
            name: 'deleteRole',
            message: 'Which role would you like to delete?',
            choices: roleChoices
          })
          .then(resp => {
            pool.query(`DELETE FROM roles WHERE id = ${resp.deleteRole[0]};`);
            console.log(`Removed ${resp.deleteRole[1]} from the database`)
            askQuestion();
          });
        };
      });
    } else if(answers.home === 'View All Departments'){
      pool.query(`SELECT id, department_name AS department FROM departments`, (err, {rows}) => {
        if (err) {
          console.log(err.message);
        } else {
          console.table(rows);
          askQuestion();
        };
      });
    } else if(answers.home === 'Add A Department'){
      inquirer.prompt({
        type: 'input',
        name: 'addDepartment',
        message: 'What is the name of the department?'
      })
      .then(resp => {
        pool.query(`INSERT INTO departments(department_name) VALUES ($1)`, [resp.addDepartment], (err) => {
          if (err){
            console.log(err.message);
          } else {
            console.log(`Added ${resp.addDepartment} to the database`);
            askQuestion();
          };
        });
      });
    } else if(answers.home === 'Delete A Department'){
      pool.query('SELECT * FROM departments', (err, {rows}) => {
        if(err){
          console.log(err.message);
        } else {
          const deptChoices = rows.map(dept => ({
            name: dept.department_name,
            value: [dept.id, dept.department_name]
          }));
          inquirer.prompt({
            type: 'list',
            name: 'deleteDepartment',
            message: 'Which department would you like to delete?',
            choices: deptChoices
          })
          .then(resp => {
            pool.query(`DELETE FROM departments WHERE id = ${resp.deleteDepartment[0]};`);
            console.log(`Removed ${resp.deleteDepartment[1]} from the database`);
            askQuestion();
          });
        };
      });
    };
  });
};

// Exporting questions to use the selections on the index.js
module.exports = {
  askQuestion
}