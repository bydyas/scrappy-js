const { getMessagesChoices } = require("../utils/consts");
const promptGetMsg = require("../prompts/getMessages.prompt");
const Group = require("../options/Group");

module.exports = getMessagesReducer = async () => {
    const { getMessageType } = await promptGetMsg();
    switch (getMessageType) {
        case getMessagesChoices[0]:
            await Group.getMessagesListAndSaveIt();
            break;
        case getMessagesChoices[1]:
            await Group.getAllMessages();
            break;
        case "Повернутися":
            break;
        default:
            break;
    }
}