const {Api} = require("telegram");
const input = require("input");
const { client } = require("../authentication");
const { saveDataLocally, getHashFromInviteLink } = require("../helpers");
const ChannelParticipantsError = require("../errors/channelParticipantsError");

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

    async getList() {
        const list = [];

        try {
            for await (const dialog of client.iterDialogs({})){
                if (!dialog.entity.left & dialog.entity.participantsCount > 0 & dialog.isGroup) {
                    list.push([
                        "ID: " + dialog.id,
                        "НАЗВА: " + dialog.title,
                        "ЛЮДІ: " + dialog.entity.participantsCount
                    ].join(" | "));
                }
            }
            await saveDataLocally(list, "GROUP_LIST", "Можете переглянути перелік груп у файлі");
        } catch (e) {
            console.log(e)
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
            await saveDataLocally(members, "GROUP_MEMBERS", "Можете переглянути учасників групи у файлі");
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
            await saveDataLocally(msg, "GROUP_MSG", "Можете переглянути повідомлення користувача у файлі");
        } catch (e) {
            console.log("Перевірьте посилання на групу або тег користувача.");
        }
    }
}

module.exports = new Group();