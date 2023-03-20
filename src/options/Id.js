const { Api } = require("telegram");
const { client } = require("../authentication");
const input = require("input");
const ncp = require("copy-paste");
const { readFile, writeFile } = require("../helpers");
const { FILE_NAMES } = require("../utils/consts");

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
            const usernames = await readFile(FILE_NAMES.ID_READ);
            const username_id_data = [];

            for (let username of usernames) {
                let id = undefined;
                try {
                    id = await this.get(username);
                } catch (e) {
                    id = "НЕМА";
                }
                username_id_data.push([id,username].join(" | @"));
            }

            await writeFile(FILE_NAMES.ID_WRITE, username_id_data.join("\r\n"));
            console.log(`Можете переглянути ID користувачів у файлі ${FILE_NAMES.ID_WRITE}`);

        } catch (e) {
            console.log(`Немає потрібного файлу (${FILE_NAMES.ID_READ}). Перевірте та спробуйте ще раз...`);
        }
    }
}

module.exports = new Id();