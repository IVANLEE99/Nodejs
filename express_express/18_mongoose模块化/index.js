const db = require("./db/db.js");

const booksModel = require("./models/booksModel.js");

db(
  () => {
    console.log("🔗成功");
    booksModel
      .create({
        name: "百年孤独",
        author: "dfdf",
        price: 30,
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.error(err);
      });
  },
  () => {
    console.log("error");
  }
);
