// Prompts templates

const optionChoices = [
    "ID користувача",
    "Учасників групи",
    "Повідомлення користувача",
    "Перелік доступних груп",
    "Вийти з облікового запису",
    "Вийти"
];

const getIdChoices = [
    "Одного користувача (потрібен його тег)",
    "Перелік користувачів (потрібен файл usernames.txt)",
    "Повернутися"
];

// Other

const FILE_NAMES = (id="", PREFIX="scrappy") => {
    return {
        "ID_READ": "1.txt",
        "ID_WRITE": `айдішники@${id}@${PREFIX}`,
        "GROUP_MEMBERS": `учасники@${id}@${PREFIX}`,
        "GROUP_MSG": `повідомлення@${id}@${PREFIX}`,
        "GROUP_LIST": `групи@${id}@${PREFIX}`
    }
}

module.exports = { optionChoices, getIdChoices, FILE_NAMES };