const { client } = require("../authentication");
const input = require("input");
const { writeFile } = require("../helpers");
const { FILE_NAMES } = require("../utils/consts");
const ChannelParticipantsError = require("../errors/channelParticipantsError");

class Group {
    async getMembers() {
        const group = await input.text("Введіть посилання на групу: ");
        const members = [group.toString()];

        try {
            for await (const user of client.iterParticipants(group.toString())){
                members.push([
                    "ID: "+ Number(user.id),
                    "@" + user.username,
                    "ІМ*Я: " + user.firstName,
                    "ПРІЗВИЩЕ: " + user.lastName,
                    "МОБ: " + user.phone,
                    "ЦЕ БОТ?: " + user.bot
                ].join(" | "));
            }

            await writeFile(FILE_NAMES.GROUP_MEMBERS, members.join("\r\n"));
            console.log(`Можете переглянути учасників групи у файлі ${FILE_NAMES.GROUP_MEMBERS}`);
        } catch (error) {
            ChannelParticipantsError.handle(error.errorMessage);
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