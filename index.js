require("dotenv").config();
const { authorize } = require("./authentication");
const promptOptions = require("./prompts/options");
const optionsReducer = require("./optionsReducer");

(async () => {
   try {
       await authorize();
       const { option } = await promptOptions();
       await optionsReducer(option);
   } catch (e) {
       console.log(e);
   }
})()