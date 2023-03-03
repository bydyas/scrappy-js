require("dotenv").config();
const { authorize } = require("./authentication");

(async () => {
   try {
       await authorize();
   } catch (e) {
       console.log(e);
   }
})()