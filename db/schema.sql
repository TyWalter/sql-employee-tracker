-- Switch to postgres user to be able to drop 
\c postgres;

-- Drop databse if exist 
DROP DATABASE IF EXISTS employee_db;

-- Create new DB
CREATE DATABASE employee_db;

-- Switch to employee_db 
\c employee_db;

-- Create Tables
CREATE TABLE departments (
  id SERIAL PRIMARY KEY,
  department_name VARCHAR(30) NOT NULL
);
CREATE TABLE roles (
  id SERIAL PRIMARY KEY,
  title VARCHAR(30),
  salary INTEGER,
  department_id INTEGER,
  FOREIGN KEY (department_id)
  REFERENCES departments(id)
  ON DELETE SET NULL
);
CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INTEGER,
  FOREIGN KEY (role_id)
  REFERENCES roles(id)
  ON DELETE SET NULL,
  manager_id INTEGER,
  FOREIGN KEY (manager_id)
  REFERENCES employees(id)
  ON DELETE SET NULL
);

-- Run seeds.sql to pre-populate database 
\i seeds.sql;

-- Join tables
-- SELECT e.id, e.first_name, e.last_name, r.title, d.department_name AS department, r.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
-- FROM employees e
-- JOIN roles r ON e.role_id = r.id
-- JOIN departments d ON r.department_id = d.id
-- LEFT JOIN employees AS manager ON e.manager_id = manager.id