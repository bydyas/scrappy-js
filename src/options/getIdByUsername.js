const { Api } = require("telegram");
const { client } = require("../authentication");
const input = require("input");
const ncp = require("copy-paste");

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
        ncp.copy(id, () => console.log(`${username} : ${id} [скопійовано]`));
    } catch (e) {
        console.log("Не існує користувача з таким тегом!\nМожливо, тег використовує як латиницю, так і кирилицю.\nСпробуйте ще раз...");
    }

    return id;
};