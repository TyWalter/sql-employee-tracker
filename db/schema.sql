/* Switch to postgres user to be able to drop */
\c postgres;

/* Drop databses if they exist */
DROP DATABASE IF EXISTS employee_db;
DROP DATABASE IF EXISTS department_db;
DROP DATABASE IF EXISTS role_db;

/* Create new DB */
CREATE TABLE employee_db;
CREATE TABLE department_db;
CREATE TABLE role_db;

/* Switch to employee_db */
\c employee_db;

/* Run seeds.sql to pre-populate table */
-- \i seeds.sql;