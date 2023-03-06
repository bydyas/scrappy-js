const optionChoices = [
    "ID користувача",
    "Вийти з облікового запису",
    "Вийти"
];

const getIdChoices = [
    "Одного користувача (потрібен його тег)",
    "Перелік користувачів (потрібен файл usernames.txt)"
];

const FILE_NAMES = {
    "ID_READ": "usernames.txt",
    "ID_WRITE": "IDs.txt"
}
module.exports = { optionChoices, getIdChoices, FILE_NAMES };