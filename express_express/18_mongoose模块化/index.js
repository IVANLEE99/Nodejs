const db = require("./db/db.js");

db(
  () => {
    console.log("🔗成功");
  },
  () => {
    console.log("error");
  }
);
