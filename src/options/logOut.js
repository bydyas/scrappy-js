const { Api } = require("telegram");
const { client } = require("../authentication");

module.exports = logOut = async () => {
    await client.connect();
    const result = await client.invoke(new Api.auth.LogOut({}));
    console.log("До побачення!");
}