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

const FILE_NAMES = {
    "prefix": "@scrappy",
    "ID_READ": "usernames.txt",
    "ID_WRITE": `IDs${this.prefix}.txt`,
    "GROUP_MEMBERS": `members${this.prefix}.txt`,
    "GROUP_MSG": `messages${this.prefix}.txt`,
    "GROUP_LIST": `groups${this.prefix}.txt`
}
module.exports = { optionChoices, getIdChoices, FILE_NAMES };