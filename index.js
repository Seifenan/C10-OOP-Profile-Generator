const fs = require("fs");
const inquirer = require("inquirer");

const genHTML = require("./src/genHTML");

const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

const genEmployee = [];

const createManager = () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "Who is the manager of this team?",
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log("Please enter a valid name!");
          return false;
        }
      }
    },
    {
      type: "input",
      name: "id",
      message: "Enter the manager's ID Number!",
      validate: idInput => {
        if (!isNaN(idInput)) {
          return true;
        } else {
          console.log("Please enter a valid ID number!");
          return false;
        }
      }
    },
    {
      type: "input",
      name: "email",
      message: "Enter the manager's email address; No CAPS!",
      validate: emailInput => {
        email = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(emailInput)
        if (email) {
          return true;
        } else {
          console.log("Please enter a valid email address; No CAPS!");
          return false;
        }
      }
    },
    {
      type: "input",
      name: "officeNumber",
      message: "Enter the manager's office number!",
      validate: officeNumberInput => {
        if (!isNaN(officeNumberInput)) {
          return true;
        } else {
          console.log("Please enter a valid Phone Number without any dashes or parentheses (-)");
          return false;
        }
      }
    }
  ])
  .then(genManager => {
    const {name, id, email, officeNumber} = genManager;
    const newManager = new Manager (name, id, email, officeNumber);

    genEmployee.push(newManager);
    console.log(newManager);
  })
};


const createEmployee = () => {
  return inquirer.prompt([
    {
      type: "list",
      name: "role",
      message: "Who would you like to add next?",
      choices: ["Engineer", "Intern"]
    },
    {
      type: "input",
      name: "name",
      message: "Enter the employee's full name!",
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log("Please enter a valid name!");
          return false;
        }
      }
    },
    {
      type: "input",
      name: "id",
      message: "Enter the employee's ID Number!",
      validate: idInput => {
        if (!isNaN(idInput)) {
          return true;
        } else {
          console.log("Please enter a valid ID number!");
          return false;
        }
      }
    },
    {
      type: "input",
      name: "email",
      message: "Enter the employee's email address; No CAPS!",
      validate: emailInput => {
        email = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(emailInput)
        if (email) {
          return true;
        } else {
          console.log("Please enter a valid email address; No CAPS!");
          return false;
        }
      }
    },
    {
      type: "input",
      name: "github",
      message: "Enter the engineer's GitHub username!",
      when: (input) => input.role === "Engineer",
      validate: employeeInput => {
        if (employeeInput) {
          return true;
        } else {
          console.log("Please enter a valid GitHub username!");
          return false;
        }
      }
    },
    {
      type: "input",
      name: "school",
      message: "Enter the intern's school or affiliation!",
      when: (input) => input.role === "Intern",
      validate: employeeInput => {
        if (employeeInput) {
          return true;
        } else {
          console.log("Please enter valid text without numbers!");
          return false;
        }
      }
    },
    {
      type: "list",
      name: "add",
      message: "Who would you like to add next?",
      choices: ["Yes", "No, I'm done adding members; Generate my Team!"]
    }
  ])
  .then(genMember => {
    let {role, name, id, email, github, school, add} = genMember;
    let newMember;
    if (role === "Engineer") {
      newMember = new Engineer (name, id, email, github);
      console.log(newMember);
    } else if (role === "Intern") {
      newMember = new Intern (name, id, email, school);
      console.log(newMember);
    }
    genEmployee.push(newMember);

    if (add === "Yes") {
      return createEmployee(genEmployee);
    } else {
      return genEmployee;
    }
  })
};



const writeFile = data => {
  fs.writeFile("./dist/index.html", data, err => {
    if (err) {
      console.log(err);
      return;
    } else {
      console.log("Your requested team profile has been created! Please check out 'index.html' in the dist folder")
    }
  })
};


createManager()
  .then(createEmployee)
  .then(genEmployee => {
    return genHTML(genEmployee);
  })
  .then(genPage => {
    return writeFile(genPage);
  })
  .catch(err => {
    console.log(err);
  });

