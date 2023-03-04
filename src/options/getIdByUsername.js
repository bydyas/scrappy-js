const { Api } = require("telegram");
const { client } = require("../authentication");
const input = require("input");
const clipboard = require("node-clipboardy");

module.exports = getIdByUsername = async () => {
    await client.connect();

    const username = await input.text("Введіть тег користувача: @");
    let id = undefined;

    try {
        const { fullUser } = await client.invoke(
            new Api.users.GetFullUser({
                id: username.toString(),
            }));
        id = Number(fullUser.id);
        clipboard.writeSync(id.toString());
        console.log(`${username} : ${id} [скопійовано]`);
    } catch (e) {
        console.log("Не існує користувача з таким тегом! Спробуйте інший");
    }

    return id;
};