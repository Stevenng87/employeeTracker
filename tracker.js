const mysql = require('mysql2');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Stayalone87',
    database: 'tracker_db',
});

connection.connect((err) => {
    if (err) throw err;
    start();
});

const start = () => {
  inquirer
    .prompt({
        name: 'action',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
            'Add department',
            'Add role',
            'Add employee',
            'View departments',
            'View roles',
            'View employees',
            'Update employee role',
        ],
    })
.then((answer) => {
  switch (answer.action) {
    case 'Add department':
      addDepartment();
      break;

    case 'Add role':
      addRole();
      break;

    case 'Add employee':
      addEmployee();
      break;

    case 'View department':
      viewDepartment();
      break;

    case 'View role':
      viewRole();
      break;

    case 'View employee':
      viewEmployee();
      break;

    case 'Update employee role':
      updateEmployee();
      break;
  }
});
};

const addDepartment = () => {
  inquirer
    .prompt({
      name: 'department',
      type: 'input',
      message: 'What department would you like to add?',
    })
    .then((answer) => {
      connection.query(
        'INSERT INTO department SET ?',
        {
          name: answer.department,
        },
        (err) => {
          if (err) throw err;
          start();
        }
      );
    });
};

const addRole = () => {
  inquirer
    .prompt([
      {
      name: 'role',
      type: 'input',
      message: 'What role would you like to add?',
      },
      {
        name: 'salary',
        type: 'input',
        message: 'What is the salary for this role?',
      },
      {
        name: 'department_id',
        type: 'input',
        message: 'What department the role belongs to?'
      },
    ])
    .then((answer) => {
      connection.query(
        'INSERT INTO role SET ?',
        {
          title: answer.role,
          salary: answer.salary,
          department_id: answer.department_id,
        },
        (err) => {
          if (err) throw err;
          start();
        }
      );
    });
};

const addEmployee = () => {
  inquirer
    .prompt([
      {
        name: 'firstName',
        type: 'input',
        message: 'What is the first name of the employee?'
      },
      {
        name: 'lastName',
        type: 'input',
        message: 'What is the last name of the employee?'
      },
      {
        name: 'role',
        type: 'input',
        message: 'What is the role of the employee?'
      },
      {
        name: 'manager',
        type: 'input',
        message: 'Who is the manager of the employee?'
      }
    ])
    .then((answer) => {
      connection.query(
        'INSERT INTO employee SET ?',
        {
          first_name: answer.firstName,
          last_name: answer.lastName,
          role_id: answer.role,
          manager_id: answer.manager
        },
        (err) => {
          if (err) throw err;
          start();
        }
      );
    });
};

const viewDepartment = () => {
  connection.query('SELECT * FROM department', (err, res) => {
    if (err) throw err;
    console.log(res);
    start();
  });
};

const viewRole = () => {
  connection.query('SELECT * FROM role', (err, res) => {
    if (err) throw err;
    console.log(res);
    start();
  });
};

const viewEmployee = () => {
  connection.query('SELECT * FROM employee', (err, res) => {
    if (err) throw err;
    console.log(res);
    start();
  });
};

// const updateEmployee = () => {
//   inquirer
//     .prompt({
//       name: 'update',
//       type: 'input',
//       message: 'Which employee role do you want to change?'
//     })
//     .then((answer) => {
//       connection.query(
//         'UPDATE employee SET ? WHERE ?',

//       )
//     })
// }