const { optionChoices } = require("./utils/consts");
const getIdByUsername = require("./options/getIdByUsername");

module.exports = optionsReducer = async (option) => {
    console.clear();
    switch (option) {
        case optionChoices[0]:
            await getIdByUsername();
            break;
        default:
            throw new Error("Invalid option");
    }
};