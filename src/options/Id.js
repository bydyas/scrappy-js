const { Api } = require("telegram");
const input = require("input");
const ncp = require("copy-paste");
const { client } = require("../authentication");
const { FILE_NAMES } = require("../utils/consts");
const { readFile, saveAsCSV } = require("../helpers");

class Id {
    async get(username) {
        await client.connect();
        const { fullUser } = await client.invoke(
            new Api.users.GetFullUser({
                id: username.toString(),
            }));
        const id = Number(fullUser.id);
        return id;
    }

    async getOne() {
        const username = await input.text("Введіть тег користувача: @");
        try {
            const id = await this.get(username);
            ncp.copy(id, () => console.log(`${username} : ${id} [скопійовано]`));
        } catch (e) {
            console.log((`Не існує користувача з таким тегом (${username})!\nМожливо, тег використовує як латиницю, так і кирилицю. Спробуйте ще раз...`));
        }
    }

    async getMany() {
        try {
            const usernames = await readFile(FILE_NAMES().ID_READ);
            const username_id_data = [];

            for (let username of usernames) {
                let id = undefined;
                try {
                    id = await this.get(username);
                } catch (e) {
                    id = "НЕ ЗНАЙШОВ";
                }
                username_id_data.push({
                    "АЙДІШКА": id,
                    "ТЕГ": "@" + username
                });
            }
            saveAsCSV(username_id_data, "ID_WRITE", "Можете переглянути ID користувачів у файлі");
        } catch (e) {
            console.log(`Немає потрібного файлу (${FILE_NAMES().ID_READ}). Перевірте та спробуйте ще раз...`);
        }
    }
}

module.exports = new Id();