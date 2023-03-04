const { optionChoices } = require("./utils/consts");

module.exports = optionsReducer = async (option) => {
    console.clear();
    switch (option) {
        case optionChoices[0]:
            console.log("ID");
            break;
        default:
            throw new Error("Invalid option");
    }
};