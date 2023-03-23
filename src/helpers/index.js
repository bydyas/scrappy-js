const fs = require('fs/promises');
const {FILE_NAMES} = require("../utils/consts");
const uuid = require("uuid");

const readFile = async (filename) => {
    let data = undefined;
    try {
        data = await fs.readFile(filename, { encoding: 'utf8' });
    } catch (e) {
        throw e;
    }
    return data?.split(/\r?\n/);
}

const writeFile = async (filename, content) => {
    try {
        await fs.writeFile(filename, content, 'utf-8');
    } catch (e) {
        throw e;
    }
}

const getHashFromInviteLink = (link) => {
    const regex = /(t.me\/\+|t.me\/joinchat\/)([a-zA-Z0-9_-]+)/;
    const match = link.match(regex);

    if (match) {
        return match[2];
    } else {
        return null;
    }
}

const saveDataLocally = async (data, filenameTag, message) => {
    const ID_LENGTH = 5;
    const id = uuid.v4().slice(ID_LENGTH * -1);
    const filename = FILE_NAMES(id)[filenameTag];
    await writeFile(filename, data.join("\r\n"));
    console.log(message + " " + filename);
}

module.exports = { readFile, writeFile, getHashFromInviteLink, saveDataLocally }