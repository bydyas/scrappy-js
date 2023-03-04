const { optionChoices } = require("./utils/consts");
const promptOptions = require("./prompts/options");
const logOut = require("./options/logOut");
const getIdByUsername = require("./options/getIdByUsername");

const optionsReducer = async (option) => {
    switch (option) {
        case optionChoices[0]:
            await getIdByUsername()
            await callOptionsReducer(true);
            break;
        case optionChoices[optionChoices.length-1]:
            await logOut();
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
