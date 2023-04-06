const {Api} = require("telegram");
const input = require("input");
const { client } = require("../authentication");
const { FILE_NAMES } = require("../utils/consts");
const { getHashFromInviteLink, saveAsCSV, readFile, extractTelegramUsername, getGroupsListFromTXT } = require("../helpers");
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

    async #getGroupsList() {
        const list = [];

        try {
            for await (const dialog of client.iterDialogs({})){
                if (!dialog.entity.left & dialog.entity.participantsCount > 0 && dialog.isGroup) {
                    list.push(
                        {
                            "АЙДІШКА": dialog.id,
                            "НАЗВА": dialog.title,
                            "ЛЮДИ": dialog.entity.participantsCount
                        }
                    );
                }
            }
        } catch (e) {
            console.log(e)
        }

        return list;
    }

    async #getMembersList(inputChat) {
        const chat = inputChat || await this.#getChat();
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
        } catch (error) {
            ChannelParticipantsError.handle(error.errorMessage);
        }

        return members;
    }

    async #getMessagesList(group, user, optionalGroupTitle) {
        const chat = group || await this.#getChat();
        const username = user || await input.text("Введіть тег користувача: ");
        const messages = [];

        try {
            for await (const message of client.iterMessages(chat,{fromUser: username.toString()})) {
                messages.push(
                    {
                        "ГРУПА": optionalGroupTitle || chat?.title || chat.toString(),
                        "КОРИСТУВАЧ": username,
                        "АЙДІШКА ПОВІДОМЛЕННЯ": message.id,
                        "ТЕКСТ ПОВІДОМЛЕННЯ": message?.text || "[ФОТО]",
                        "ДАТА": new Date(message.date).toTimeString()
                    }
                );
            }
        } catch (e) {
            console.log("Перевірьте посилання на групу або тег користувача.");
        }

        return messages;
    }

    async getGroupsListAndSaveIt() {
        console.log("Шукаю...")
        const list = await this.#getGroupsList();
        saveAsCSV(list, "GROUP_LIST", "Можете переглянути перелік груп у файлі");
    }

    async getMembersListAndSaveIt() {
        const members = await this.#getMembersList();
        saveAsCSV(members, "GROUP_MEMBERS", "Можете переглянути учасників групи у файлі");
    }

    async getMessagesListAndSaveIt(group, user) {
        const messages = await this.#getMessagesList(group, user);
        saveAsCSV(messages, "GROUP_MSG", "Можете переглянути повідомлення користувача у файлі");
    }

    async getAllMessages() {
        let iterator = 0;
        let filename = await input.text("Введіть назву текстового файлу (без .txt): ");
        if (!filename) return;

        let username = await input.text("Введіть тег користувача: ");
        username = extractTelegramUsername(username);
        if (!username) return;

        let groups = await getGroupsListFromTXT(filename + ".txt");

        console.log("Шукаю...");
        const allMessages = [];
        for (const group of groups) {
            const messageBlock = await this.#getMessagesList(group["АЙДІШКА"], username, group["НАЗВА"]);
            console.log(group, messageBlock)
            if (messageBlock.length > 0) iterator++;
            allMessages.push(...messageBlock);
        }

        if (allMessages.length > 0) {
            console.log("Успішно перевірено груп: " + iterator);
            saveAsCSV(allMessages, "GROUP_MSG", "Можете переглянути повідомлення користувача у файлі", username);
        } else {
            console.log(`Нічого не знайшов // Перевірьте тег користувача (${username}) та спробуйте знову.`);
        }

        return;
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