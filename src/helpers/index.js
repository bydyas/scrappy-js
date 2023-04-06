const fs = require('fs/promises');
const uuid = require("uuid");
const { stringify } = require("csv-stringify");
const { FILE_NAMES } = require("../utils/consts");

const readFile = async (filename) => {
    let data = undefined;
    try {
        data = await fs.readFile(filename, { encoding: 'utf8' });
    } catch (err) {
        if (err.code === "ENOENT") {
            return console.log(`Не знайшов потрібний файл (${filename})`);
        }
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

const extractTelegramUsername = (link) => {
    const match = link.match(/https?:\/\/t\.me\/(.+)/i);

    if (match && match[1]) {
        return match[1];
    } else {
        return link;
    }
}

const saveAsCSV = (data=[], filenameTag, message, username) => {
    const ID_LENGTH = 5;
    const id = uuid.v4().slice(ID_LENGTH * -1);
    const filename = FILE_NAMES(id, username)[filenameTag] + ".csv";

    stringify(data, {
        header: true
    }, async (err, output) => {
        await fs.writeFile(filename, output);
        console.log(message + " " + filename);
    })
}

const formatAsTGGroupLink = (str) => {
    const LINK_FORMAT = "https://t.me/";
    if (str[0] = "@") str = str.slice(1);
    return LINK_FORMAT+str.trim();
}

const getGroupsListFromTXT = async (filename) => {
    let data = await readFile(filename);
    data = data.map(line=> {
        line = line.split(" ")
        return {"АЙДІШКА": formatAsTGGroupLink(line[1]), "НАЗВА": line[2]};
    });
    return data;
}

module.exports = {
    readFile,
    writeFile,
    getHashFromInviteLink,
    saveAsCSV,
    extractTelegramUsername,
    getGroupsListFromTXT
}