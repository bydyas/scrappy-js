const inquirer = require("inquirer");
const { getIdChoices} = require("../utils/consts");

const questions = [
    {
        type: "list",
        name: "getIdType",
        message: "Як бажаєте отримати ID?",
        choices: getIdChoices
    }
]

module.exports = promptGetId = async () => inquirer.prompt(questions);