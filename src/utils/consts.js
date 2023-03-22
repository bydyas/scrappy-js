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

const PREFIX = "@scrappy";

const FILE_NAMES = {
    "ID_READ": "usernames.txt",
    "ID_WRITE": `IDs${PREFIX}.txt`,
    "GROUP_MEMBERS": `members${PREFIX}.txt`,
    "GROUP_MSG": `messages${PREFIX}.txt`,
    "GROUP_LIST": `groups${PREFIX}.txt`
}
module.exports = { optionChoices, getIdChoices, FILE_NAMES };