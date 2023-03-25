const {Api} = require("telegram");
const input = require("input");
const { client } = require("../authentication");
const { FILE_NAMES } = require("../utils/consts");
const { getHashFromInviteLink, saveAsCSV, readFile } = require("../helpers");
const ChannelParticipantsError = require("../errors/channelParticipantsError");
const InviteToChannelError = require("../errors/inviteToChannelError");

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
                    list.push(
                        {
                            "АЙДІШКА": dialog.id,
                            "НАЗВА": dialog.title,
                            "ЛЮДІ": dialog.entity.participantsCount
                        }
                    );
                }
            }
            saveAsCSV(list, "GROUP_LIST", "Можете переглянути перелік груп у файлі");
        } catch (e) {
            console.log(e)
        }
    }

    async getMembers() {
        const chat = await this.#getChat();
        const members = [];

        try {
            for await (const user of client.iterParticipants(chat)){
                members.push({
                    "АЙДІШКА": Number(user.id),
                    "ТЕГ": user.username,
                    "ІМ*Я": user.firstName,
                    "ПРІЗВИЩЕ": user.lastName,
                    "МОБ": user.phone,
                    "ЦЕ БОТ?": user.bot ? "Так" : "Ні"
                });
            }

            saveAsCSV(members, "GROUP_MEMBERS", "Можете переглянути учасників групи у файлі")
        } catch (error) {
            ChannelParticipantsError.handle(error.errorMessage);
        }
    }

    async getMessages() {
        const chat = await this.#getChat();
        const username = await input.text("Введіть тег користувача: ");
        const messages = [];

        try {
            for await (const message of client.iterMessages(chat,{fromUser: username.toString()})) {
                messages.push(
                    {
                        "АЙДІШКА": message.id,
                        "ПОВІДОМЛЕННЯ": message?.text || "[ФОТО]"
                    }
                );
            }
            saveAsCSV(messages, "GROUP_MSG", "Можете переглянути повідомлення користувача у файлі");
        } catch (e) {
            console.log("Перевірьте посилання на групу або тег користувача.");
        }
    }

    async inviteUsers() {
        const chat = await this.#getChat();
        const usersList = await readFile(FILE_NAMES().INVITE_READ);
        await client.connect();

        try {
            const { chats } = await client.invoke(
                new Api.channels.InviteToChannel({
                    channel: chat,
                    users: usersList,
                })
            );
            console.log(`Користувачі були успішно додані до групи/каналу (${chats[0].title})`);
        } catch (error) {
            InviteToChannelError.handle(error.errorMessage);
        }
    }
}

module.exports = new Group();