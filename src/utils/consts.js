const optionChoices = [
    "ID користувача",
    "Учасників групи",
    "Повідомлення користувача",
    "Вийти з облікового запису",
    "Вийти"
];

const getIdChoices = [
    "Одного користувача (потрібен його тег)",
    "Перелік користувачів (потрібен файл usernames.txt)",
    "Повернутися"
];

const FILE_NAMES = {
    "ID_READ": "usernames.txt",
    "ID_WRITE": "IDs.txt",
    "GROUP_MEMBERS": "members.txt",
    "GROUP_MSG": "messages.txt"
}
module.exports = { optionChoices, getIdChoices, FILE_NAMES };