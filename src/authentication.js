const { TelegramClient } = require("telegram");
const { StoreSession } = require("telegram/sessions");
const input = require("input");
const os = require("os")

const apiId = +process.env.SCRAPPY_APP_ID
const apiHash = process.env.SCRAPPY_API_HASH;
const storeSession = new StoreSession('./my_session');

const client_options = {
    deviceModel: `SCRAPPY@${os.hostname()}`,
    systemVersion: os.version() || "Unknown node",
    appVersion: "1.1.1",
    useWSS: true,
    testServers: false,
    connectionRetries: 5
}

const client = new TelegramClient(storeSession, apiId, apiHash, client_options);

const authorize = async () => {
    await client.start({
        phoneNumber: async () => await input.text("Enter your number: "),
        password: async () => await input.text("Enter your password: "),
        phoneCode: async () => await input.text("Enter the code you received: "),
        onError: (err) => console.log(err),
    });
    console.log("You should now be connected.");
};

module.exports = { client, authorize };