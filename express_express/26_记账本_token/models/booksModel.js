const mongoose = require("mongoose");

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
module.exports = novelModel;
