module.exports = function (success, error, close) {
  const mongoose = require("mongoose");
  mongoose.connect("mongodb://127.0.0.1:27017/bilibili");

  mongoose.connection.on("open", () => {
    success && success();
    console.log("open~");
  });
  mongoose.connection.on("error", () => {
    error && error();
    console.log("error~");
  });
  mongoose.connection.on("close", () => {
    close && close();
    console.log("close~");
  });
};
