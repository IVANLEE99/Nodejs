// 1、导入express
const express = require("express");
//2、创建应用
const app = new express();
//3、监听路由
app.get("/home", (req, res) => {
  res.end("/home0000");
});
//4、监听端口
app.listen(9000, () => {
  console.log("express is listen on 9000");
});
