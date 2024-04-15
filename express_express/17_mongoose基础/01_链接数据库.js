const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/bilibili");

mongoose.connection.on("open", () => {
  let bookSchema = new mongoose.Schema({
    name: String,
    author: String,
    price: Number,
  });
  let BookModel = mongoose.model("books", bookSchema);

  BookModel.create({
    name: "西游记",
    author: "吴承恩",
    price: 200,
  }).then((err, data) => {
    console.error("err", err);
    console.log("data", data);
  });
  console.log("open~");
});
mongoose.connection.on("error", () => {
  console.log("error~");
});
mongoose.connection.on("close", () => {
  console.log("close~");
});
// setTimeout(() => {
//   mongoose.disconnect();
// }, 2000);
