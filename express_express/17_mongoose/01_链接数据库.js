const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/bilibili");

mongoose.connection.on("open", () => {
  console.log("open~");
});
mongoose.connection.on("error", () => {
  console.log("error~");
});
mongoose.connection.on("close", () => {
  console.log("close~");
});
setTimeout(() => {
  mongoose.disconnect();
}, 2000);
