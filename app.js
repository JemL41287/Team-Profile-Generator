const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");
let employees = [];
let managers = [];
function addEmployee() {
    inquirer.prompt (
        {
            type: "confirm",
            message: "Would you like to add an employee?",
            name: "add-employee"
        }
    ).then(function(response) {
        if(response["add-employee"]) {
            inquirer.prompt (
                [
                    {
                        type: "input",
                        message: "What is the employee's name?",
                        name: "name"
                    },
                    {
                        type: "input",
                        message: "What is the employee's ID number?",
                        name: "id"
                    },
                    {
                        type: "input",
                        message: "What is the employee's email address?",
                        name: "email"
                    },
                    {
                        type: "list",
                        message: "What is the employee's role?",
                        name: "role",
                        choices: ["Manager", "Engineer", "Intern"]
                    }
                ]
            ).then (function(data) {
                if(data.role == "Manager") {
                    inquirer.prompt (
                        {
                            type: "input",
                            message: "What is the manager's office number?",
                            name: 'officeNumber'
                        }
                    ).then(function(managerResponse) {
                        let manager = new Manager(data.name, data.id, data.email, managerResponse.officeNumber);
                        employees.push(manager);
                        managers.push(manager)
                        addEmployee();
                    });
                } else if(data.role == "Intern") {
                    inquirer.prompt (
                        {
                            type: "input",
                            message: "What is the intern's school?",
                            name: "school"
                        }
                    ).then(function(response) {
                        let intern = new Intern(data.name, data.id, data.email, response.school);
                        employees.push(intern);
                        addEmployee();
                    });
                } else if (data.role == "Engineer") {
                    inquirer.prompt (
                        {
                            type: "input",
                            message: "What is the engineer's GitHub username?",
                            name: "github"
                        }
                    ).then (function(response) {
                        let engineer = new Engineer(data.name, data.id, data.email, response.github);
                        employees.push(engineer);
                        addEmployee();
                    });
                }
            });
        } else {
            if (managers.length >= 1) {
                fs.mkdirSync(OUTPUT_DIR);
                fs.writeFileSync(outputPath, render(employees), function(err) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("Your Team Profile has been successfully created in your output folder.");
                    }
                });
            } 

        }
    });
}
addEmployee();