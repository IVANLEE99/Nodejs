const express = require("express");
const path = require("path");
const app = new express();
// //1、引入模板引擎
// app.set("view engine", "ejs");
// //2、设置模板文件存放位置
// app.set("views", path.resolve(__dirname, "./views/ejs"));

//1、引入模板引擎
app.set("view engine", "pug");
//2、设置模板文件存放位置
app.set("views", path.resolve(__dirname, "./views/pug"));
app.get("/home", (req, res) => {
  //3、render 响应
  let title = "在 express中使用ejs";
  res.render("home", { title });
  //   res.send("home 页面");
});
app.listen(9000, () => {
  console.log("app is listening on 9000...");
});
