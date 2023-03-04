require("dotenv").config();
const { authorize } = require("./src/authentication");
const { callOptionsReducer } = require("./src/optionsReducer");

(async () => {
   try {
       await authorize();
       await callOptionsReducer();
   } catch (e) {
       console.log(e);
   }
})()