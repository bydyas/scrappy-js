const inquirer = require("inquirer");
const { getMessagesChoices} = require("../utils/consts");

const questions = [
    {
        type: "list",
        name: "getMessageType",
        message: "Як бажаєте отримати повідомлення?",
        choices: getMessagesChoices
    }
]

module.exports = promptGetMsg = async () => inquirer.prompt(questions);