const { optionChoices } = require("../utils/consts");
const promptOptions = require("../prompts/options.prompt");
const logOut = require("../options/logOut");
const getIdReducer = require("./getIdReducer");
const Group = require("../options/Group");

const optionsReducer = async (option) => {
    switch (option) {
        case optionChoices[0]:
            await getIdReducer();
            await callOptionsReducer(true, 2500);
            break;
        case optionChoices[1]:
            await Group.getMembers();
            await callOptionsReducer(true);
            break;
        case optionChoices[2]:
            await Group.getMessages();
            await callOptionsReducer(true);
            break;
        case optionChoices[optionChoices.length-2]:
            await logOut();
            break;
        case optionChoices[optionChoices.length-1]:
            process.exit();
            break;
        default:
            throw new Error("Invalid option");
    }
};

const callOptionsReducer = async (delay=false, ms=2000) => {

    const IMMEDIATELY_CALL_TIME = 0;

    if (!delay) {
        ms = IMMEDIATELY_CALL_TIME;
    }

    setTimeout(async () => {
        console.clear();
        const { option } = await promptOptions();
        console.clear();
        await optionsReducer(option);
    }, ms)
}

module.exports = { callOptionsReducer, optionsReducer };
