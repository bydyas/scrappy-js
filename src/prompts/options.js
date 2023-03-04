const inquirer = require("inquirer");
const { optionChoices} = require("../utils/consts");

const questions = [
    {
        type: "list",
        name: "option",
        message: "Що бажаєте отримати?",
        choices: optionChoices
    }
]

module.exports = promptOptions = async () => inquirer.prompt(questions);
