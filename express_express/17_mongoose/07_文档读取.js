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
  //     name: "红楼梦",
  //     author: "吴承恩",
  //     price: 200,
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

  //查一条
  //   novelModel
  //     .findOne({
  //       name: "西游记",
  //     })
  //     .then((data) => {
  //       console.log(data);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  //   console.log("open~");
  // });

  //查id
  // novelModel
  //   .findById("661c93afb0eda6d27692b08c")
  //   .then((data) => {
  //     console.log(data);
  //   })
  //   .catch((err) => {
  //     console.error(err);
  //   });

  //查条件
  // novelModel
  //   .find({
  //     tags: "名著",
  //   })
  //   .then((data) => {
  //     console.log(data);
  //   })
  //   .catch((err) => {
  //     console.error(err);
  //   });

  //查所有
  novelModel
    .find()
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
