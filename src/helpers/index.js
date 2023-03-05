const fs = require('fs/promises');

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

module.exports = { readFile, writeFile }