const mongoose = require("mongoose");

let UserSchema = new mongoose.Schema({
  //用户名
  username: {
    type: String,
    required: true,
    unique: true,
  },
  //密码
  password: {
    type: String,
    required: true,
  },
});
let UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;
