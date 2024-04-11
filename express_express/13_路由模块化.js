// 导入express
const express = require("express");
const fs = require("fs");
const homeRouter = require("./routers/homeRouter.js");
const adminRouter = require("./routers/adminRouter.js");

//创建应用
const app = new express();

app.use(homeRouter);
app.use(adminRouter);

//监听端口
app.listen(9000, () => {
  console.log("express is listen on 9000");
});
