// Prompts templates

const optionChoices = [
    "ID користувача",
    "Учасників групи",
    "Повідомлення користувача",
    "Перелік доступних груп",
    "Запросити користувачів до групи",
    "Вийти з облікового запису",
    "Вийти"
];

const getIdChoices = [
    "Одного користувача (потрібен його тег)",
    "Перелік користувачів (потрібен файл usernames.txt)",
    "Повернутися"
];

const getMessagesChoices = [
  "Повідомлення із групи",
  "Тотально усі повідомлення (через файл)"
];

// Custom CLI

const CLI = {
    "TERMINAL_TITLE": "Scrappy",
    "ASCII_OUTPUT": "SCRAPPY"
}

// Read & Write files

const FILE_NAMES = (id="", username="",  PREFIX="scrappy") => {
    return {
        "ID_READ": "1.txt",
        "INVITE_READ": "1.txt",
        "ID_WRITE": `_айдішники@${id}@${PREFIX}`,
        "GROUP_MEMBERS": `_учасники@${id}@${PREFIX}`,
        "GROUP_MSG": `${username}_повідомлення@${id}@${PREFIX}`,
        "GROUP_LIST": `_групи@${id}@${PREFIX}`
    }
}

module.exports = {
    optionChoices,
    getIdChoices,
    getMessagesChoices,
    FILE_NAMES,
    CLI
};