// 导入express
const express = require("express");
//创建应用
const app = new express();
//监听路由
app.get("/:id.html", (req, res) => {
  res.setHeader("content-type", "text/html;charset=utf-8");
  res.end(req.params.id + "商品详情");
});

//监听端口
app.listen(9000, () => {
  console.log("express is listen on 9000");
});
