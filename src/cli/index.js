
const figlet = require('figlet');
const {CLI} = require("../utils/consts");

const setTerminalTitle = (title) => {
    process.stdout.write(
        String.fromCharCode(27) + "]0;" + title + String.fromCharCode(7)
    );
}

const outputAsciiTitle = (text) => {
    figlet(text, function(err, data) {
        if (err) return;
        console.log(data);
    });
}

const beautifyCli = () => {
    setTerminalTitle(CLI.TERMINAL_TITLE);
    outputAsciiTitle(CLI.ASCII_OUTPUT)
}

module.exports = { outputAsciiTitle, setTerminalTitle, beautifyCli };