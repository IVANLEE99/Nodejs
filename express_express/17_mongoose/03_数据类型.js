const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/bilibili");

mongoose.connection.on("open", () => {
  let bookSchema = new mongoose.Schema({
    name: String,
    author: String,
    price: Number,
    is_hot: Boolean,
    tags: Array,
    pub_time: Date,
    // test: mongoose.Types.Mixed,
  });
  let BookModel = mongoose.model("books", bookSchema);

  BookModel.create({
    name: "西游记",
    author: "吴承恩",
    price: 200,
    is_hot: true,
    pub_time: new Date(),
    tags: ["国学", "名著", "文学"],
    test: "dfdfdf",
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
