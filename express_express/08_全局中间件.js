// 导入express
const express = require("express");
const fs = require("fs");
//创建应用
const app = new express();

function recordMiddleware(req, res, next) {
  const { url, ip } = req;
  let timestamp = new Date().getTime();
  fs.appendFileSync(
    __dirname + "/accesslog.txt",
    `${timestamp}: ${url} ${ip} \r\n`
  );
  next();
}
app.use(recordMiddleware);
//监听路由
app.get("/other", (req, res) => {
  res.send("other");
});
app.get("/admin", (req, res) => {
  res.send("admin");
});
//监听端口
app.listen(9000, () => {
  console.log("express is listen on 9000");
});
