const { client } = require("../authentication");
const input = require("input");
const { writeFile, getHashFromInviteLink } = require("../helpers");
const { FILE_NAMES } = require("../utils/consts");
const ChannelParticipantsError = require("../errors/channelParticipantsError");
const {Api} = require("telegram");

class Group {
    async #getChat() {
        const link = await input.text("Введіть посилання на групу: ");
        const hash = getHashFromInviteLink(link);

        if (hash) {
            const res = await client.invoke(new Api.messages.CheckChatInvite({ hash }));
            return res?.chat;
        } else {
            return link;
        }
    }

    async getMembers() {
        const chat = await this.#getChat();
        const members = [chat?.title || chat.toString()];

        try {
            for await (const user of client.iterParticipants(chat)){
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
        const chat = await this.#getChat();
        const username = await input.text("Введіть тег користувача: ");

        try {
            const msg = [`Група: ${chat?.title || chat.toString()} | Користувач: ${username}`];
            for await (const message of client.iterMessages(chat,{fromUser: username.toString()})) {
                msg.push([message.id, message?.text || "ФОТО"].join(" | "));
            }

            await writeFile(FILE_NAMES.GROUP_MSG, msg.join("\r\n"));
            console.log(`Можете переглянути повідомлення користувача у файлі ${FILE_NAMES.GROUP_MSG}`);
        } catch (e) {
            console.log("Перевірьте посилання на групу або тег користувача.");
        }
    }
}

module.exports = new Group();