const { client } = require("../authentication");
const input = require("input");
const { writeFile } = require("../helpers");
const { FILE_NAMES } = require("../utils/consts");
const Id = require("./Id");

class Group {
    async getMembers() {
        const entity = await input.text("Введіть посилання на групу: ");
        try {
            let result = await client.getParticipants(entity.toString());
            result = result.map(user => [ Number(user.id), user.username ].join(" | @"));
            result.unshift(entity.toString());

            await writeFile(FILE_NAMES.GROUP_MEMBERS, result.join("\r\n"));
            console.log(`Можете переглянути учасників групи у файлі ${FILE_NAMES.GROUP_MEMBERS}`);
        } catch (e) {
            console.log("Упс..Групу не знайдено");
        }
    }

    async getMessages() {
        const group = await input.text("Введіть посилання на групу: ");
        const username = await input.text("Введіть тег користувача: ");

        try {
            const msg = [`Група: ${group} | Користувач: ${username}`];
            for await (const message of client.iterMessages(group.toString(),{fromUser: username.toString()})) {
                msg.push([message.id, message.text].join(" | "));
            }

            await writeFile(FILE_NAMES.GROUP_MSG, msg.join("\r\n"));
            console.log(`Можете переглянути повідомлення користувача у файлі ${FILE_NAMES.GROUP_MSG}`);
        } catch (e) {
            console.log("Перевірьте посилання на групу або тег користувача.")
        }
    }
}

module.exports = new Group();