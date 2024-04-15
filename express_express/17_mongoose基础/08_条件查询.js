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
  //     name: "活着",
  //     author: "是谁呢？",
  //     price: 50,
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

  //$lt $gt $gte $lte $ne
  // novelModel
  //   .find({
  //     price: { $lt: 100 },
  //   })
  //   .then((data) => {
  //     console.log(data);
  //   })
  //   .catch((err) => {
  //     console.error(err);
  //   });

  //$or
  // novelModel
  //   .find({
  //     $or: [{ name: "三体" }, { author: "是谁呢？" }],
  //   })
  //   .then((data) => {
  //     console.log(data);
  //   })
  //   .catch((err) => {
  //     console.error(err);
  //   });

  //$and

  // //价格大于等于 20 小于等于 100
  // novelModel
  //   .find({
  //     $and: [
  //       {
  //         price: { $gte: 20 },
  //       },
  //       {
  //         price: {
  //           $lte: 100,
  //         },
  //       },
  //     ],
  //   })
  //   .then((data) => {
  //     console.log(data);
  //   })
  //   .catch((err) => {
  //     console.error(err);
  //   });

  //正则表达式
  novelModel
    .find({
      // name: /三/,
      name: new RegExp("三"),
    })
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
