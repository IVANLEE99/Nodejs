const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/bilibili");

mongoose.connection.on("open", () => {
  let novelSchema = new mongoose.Schema({
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
  let novelModel = mongoose.model("novels", novelSchema);

  // novelModel
  //   .create({
  //     name: "活着009",
  //     author: "是谁呢？",
  //     price: 51,
  //     is_hot: false,
  //     pub_time: new Date(),
  //     // tags: '',
  //     test: "dfdfdf",
  //   })
  //   .then((data) => {
  //     console.log("data", data);
  //   })
  //   .catch((err) => {
  //     console.error(err);
  //   });

  //需要的字段
  // novelModel
  //   .find()
  //   .select({
  //     name: 1,
  //     price: 1,
  //     _id: 0,
  //   })
  //   .exec()
  //   .then((data) => {
  //     console.log(data);
  //   })
  //   .catch((err) => {
  //     console.error(err);
  //   });

  //数据排序 sort 1 正序列 -1  倒序
  // novelModel
  //   .find()
  //   .select({
  //     name: 1,
  //     price: 1,
  //     _id: 0,
  //   })
  //   .sort({
  //     price: -1,
  //   })
  //   .exec()
  //   .then((data) => {
  //     console.log(data);
  //   })
  //   .catch((err) => {
  //     console.error(err);
  //   });

  //数据截取 skip 跳过 limit 限定
  novelModel
    .find()
    .select({
      name: 1,
      price: 1,
      _id: 0,
    })
    .sort({
      price: -1,
    })
    .skip(2)
    .limit(2)
    .exec()
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.error(err);
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
