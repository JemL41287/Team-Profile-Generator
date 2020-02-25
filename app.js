const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
​const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
​
const render = require("./lib/htmlRenderer");

let employees = [];
let managers = [];

function addEmployee() {
    inquirer.prompt (
        {
            type: 'confirm',
            message: 'Would you like to add an employee?',
            name: 'add-employee'
        }
    ).then(function(response) {
        if(response['add-employee']) {
            inquirer.prompt (
                [
                    {
                        type: 'input',
                        message: 'What is the employee name?',
                        name: 'name'
                    },
                    {
                        type: 'input',
                        message: 'What is their email address?',
                        name: 'email'
                    },
                    {
                        type: 'list',
                        message: 'What is the employee role?',
                        name: 'role',
                        choices: ['Manager', 'Engineer', 'Intern']
                    }
                ]
            ).then (function(data) {
                if(data.role == 'Manager') {
                    inquirer.prompt (
                        {
                            type: 'input',
                            message: 'What is their office number?',
                            name: 'officeNumber'
                        }
                    ).then(function(managerResponse) {
                        let manager = new Manager(data.name, data.id, data.email, managerResponse.number);
                        employees.push(manager);
                        managers.push(manager)
                        addEmployee();
                    })
                } else if(data.role == 'Intern') {
                    inquirer.prompt (
                        {
                            type: 'input',
                            message: 'What is their school?',
                            name: 'school'
                        }
                    ).then(function(response) {
                        let intern = new Intern(data.name, data.id, data.email, response.school);
                        employees.push(intern);
                        addEmployee();
                    })
                } else if (data.role == 'Engineer') {
                    inquirer.prompt (
                        {
                            type: 'input',
                            message: 'What is their GitHub username?',
                            name: 'github'
                        }
                    ).then (function(response) {
                        let engineer = new Engineer(data.name, data.id, data.email, response.github);
                        employees.push(engineer);
                        addEmployee();
                    })
                }
            })
        } else {
            if(managers.length >= 1) {
                let main = render(employees);
                fs.writeFileSync(outputPath, main, function (err) {
                    if(err) throw err;
                })
            } else {
                console.log('Team must have one manager');
                addEmployee();
            }
        }
    })
}

addEmployee();


​
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
​
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!
​
// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.
​
// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.
​
// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an 
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!```
