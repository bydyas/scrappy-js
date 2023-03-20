const { Api } = require("telegram");
const { client } = require("../authentication");
const input = require("input");
const { readFile, writeFile } = require("../helpers");
const { FILE_NAMES } = require("../utils/consts");

class Group {
    async getMembers() {
        const entity = await input.text("Введіть посилання на групу: ");
        try {
            let result = await client.getParticipants(entity.toString());
            result = result.map(user => [ Number(user.id), user.username ].join(" | @"));
            result.unshift(entity.toString());

            await writeFile(FILE_NAMES.GROUP_MEMBERS, result.join("\r\n"));
            console.log(`Можете переглянути учасників групи у файлі ${FILE_NAMES.GROUP_MEMBERS}`);
        } catch (e) {
            console.log("Упс..Групу не знайдено");
        }
    }
}

module.exports = new Group();