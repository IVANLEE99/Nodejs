// 导入express
const express = require("express");
const fs = require("fs");
//创建应用
const app = new express();

app.use((req, res, next) => {
  let referer = req.get("referer");
  console.log(referer);
  if (referer) {
    let { hostname } = new URL(referer);
    console.log(hostname);
    if (hostname !== "127.0.0.1") {
      res.status(404).send("<h1>404 not found</h1>");
    }
  }
  next();
});
app.use(express.static(__dirname + "/public"));

app.all("*", (req, res) => {
  res.send("hello express");
});
//监听端口
app.listen(9000, () => {
  console.log("express is listen on 9000");
});
