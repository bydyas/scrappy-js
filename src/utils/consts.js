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

const FILE_NAMES = (id="", PREFIX="scrappy") => {
    return {
        "ID_READ": "usernames.txt",
        "ID_WRITE": `IDs@${id}@${PREFIX}.txt`,
        "GROUP_MEMBERS": `members@${id}@${PREFIX}.txt`,
        "GROUP_MSG": `messages@${id}@${PREFIX}.txt`,
        "GROUP_LIST": `groups@${id}@${PREFIX}.txt`
    }
}
module.exports = { optionChoices, getIdChoices, FILE_NAMES };