require("dotenv").config();
const { authorize } = require("./src/authentication");
const { callOptionsReducer } = require("./src/reducers/optionsReducer");
const { beautifyCli } = require("./src/cli");

(async () => {
    beautifyCli();
    try {
       await authorize();
       await callOptionsReducer();
    } catch (err) {
       console.log(err);
    }
})()