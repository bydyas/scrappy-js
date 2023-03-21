const { getIdChoices } = require("../utils/consts");
const promptGetIdByUsername = require("../prompts/getIdByUsername.prompt");
const Id = require("../options/Id");

module.exports = getIdReducer = async () => {
    const { getIdType } = await promptGetIdByUsername();
    switch (getIdType) {
        case getIdChoices[0]:
            await Id.getOne();
            break;
        case getIdChoices[1]:
            await Id.getMany();
            break;
        case getIdChoices[getIdChoices.length-1]:
            break;
        default:
            break;
    }
}