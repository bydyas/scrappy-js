require("dotenv").config();
const { authorize } = require("./src/authentication");
const promptOptions = require("./src/prompts/options");
const optionsReducer = require("./src/optionsReducer");

(async () => {
   try {
       await authorize();
       const { option } = await promptOptions();
       await optionsReducer(option);
   } catch (e) {
       console.log(e);
   }
})()