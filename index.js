const fs = require("fs");
const inquirer = require("inquirer");

const genHTML = require("./src/genHTML");

const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");



const createManager = () => {

}

const createEmployee = () => {

}


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

