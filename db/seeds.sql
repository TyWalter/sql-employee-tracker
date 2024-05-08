-- Seeding data into schema to have some basic information of employees
INSERT INTO employee_db(first_name, last_name, role_id, manager_id)
  VALUES
    ('Mike', 'Chan'),
    ('Ashley', 'Rodriguez'),
    ('Kevin', 'Tupik'),
    ('Kunal', 'Singh'),
    ('Malia', 'Brown'),
    ('Sarah', 'Lourd'),
    ('Tom', 'Allen');

INSERT INTO role_db(title, salary, department_id)
  VALUES
    ('Salesperson', 80000),
    ('Lead Engineer', 150000)
    ('Software Engineer', 120000)
    ('Account Manager', 160000)
    ('Accountant', 125000)
    ('Legal Team Lead', 250000)
    ('Lawyer', 190000);

INSERT INTO department_db(departmentName)
  VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');