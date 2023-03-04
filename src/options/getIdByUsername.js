const { Api } = require("telegram");
const { client } = require("../authentication");
const input = require("input");

module.exports = getIdByUsername = async () => {
    await client.connect();

    const username = await input.text("Введіть тег користувача: @");
    const { fullUser } = await client.invoke(
        new Api.users.GetFullUser({
            id: username.toString(),
    }));
    const id = Number(fullUser.id);

    console.log(id);
    return id;
};