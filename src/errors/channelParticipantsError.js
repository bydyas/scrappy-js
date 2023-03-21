class ChannelParticipantsError {
    handle(type) {
        switch (type) {
            case "CHANNEL_INVALID":
                console.log("Наданий канал недійсний.");
                break;
            case "CHANNEL_PRIVATE":
                console.log("Ви не приєдналися до цього каналу/супергрупи.");
                break;
            case "CHAT_ADMIN_REQUIRED":
                console.log("Ви повинні бути адміністратором цього чату, щоб зробити це.");
                break;
            default:
                throw new Error("Невідом помилк");
        }
    }
}

module.exports = new ChannelParticipantsError();

