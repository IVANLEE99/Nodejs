const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/bilibili");

mongoose.connection.on("open", () => {
  let bookSchema = new mongoose.Schema({
    name: {
      type: String,
      require: true,
      unique: true,
    },
    author: {
      type: String,
      default: "佚名",
    },
    price: Number,
    is_hot: Boolean,
    tags: {
      type: String,
      enum: ["名著", "其他"],
      default: "其他",
    },
    pub_time: Date,
    // test: mongoose.Types.Mixed,
  });
  let BookModel = mongoose.model("books", bookSchema);

  // BookModel.create({
  //   name: "西游记00900",
  //   author: "吴承恩",
  //   price: 200,
  //   is_hot: false,
  //   pub_time: new Date(),
  //   // tags: '',
  //   test: "dfdfdf",
  // }).then((err, data) => {
  //   console.error("err", err);
  //   console.log("data", data);
  // });

  // BookModel.create({
  //   name: "西游记002000",
  //   author: "吴承恩",
  //   price: 200,
  //   is_hot: true,
  //   pub_time: new Date(),
  //   // tags: '',
  //   test: "dfdfdf谁的粉丝粉丝发的",
  // }).then((err, data) => {
  //   console.error("err", err);
  //   console.log("data", data);
  // });

  //   BookModel.deleteOne({
  //     name: "西游记002000",
  //   }).then((data, err) => {
  //     console.error(data, err);
  //   });
  //   console.log("open~");
  // });

  BookModel.deleteMany({
    is_hot: false,
  }).then((data, err) => {
    console.error(data, err);
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
