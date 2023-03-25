class InviteToChannelError {
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
            case "USER_CHANNELS_TOO_MUCH":
                console.log("Один із користувачів, яких ви намагалися додати, уже перебуває у забагато каналів/супергруп.");
                break;
            case "USER_KICKED":
                console.log("Цього користувача було видалено з цієї супергрупи/каналу.");
                break;
            case "USER_PRIVACY_RESTRICTED":
                console.log("Налаштування конфіденційності користувача не дозволяють це зробити.");
                break;
            case "USER_ID_INVALID":
                console.log("Наданий ідентифікатор користувача недійсний.");
                break;
            default:
                return;
        }
    }
}

module.exports = new InviteToChannelError();
