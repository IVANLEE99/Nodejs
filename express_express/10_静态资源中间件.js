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
app.use(express.static(__dirname + "/public"));
app.use(recordMiddleware);
const checkCodeMiddleware = (req, res, next) => {
  let { code } = req.query;
  if (+code === 521) {
    next();
  } else {
    res.send("code暗号错误～");
  }
};
const checkNumberMiddleware = (req, res, next) => {
  let { number } = req.query;
  if (+number === 521) {
    next();
  } else {
    res.send("number暗号错误～");
  }
};
//监听路由
app.get("/other", [checkCodeMiddleware, checkNumberMiddleware], (req, res) => {
  res.send("other");
});
app.get("/admin", checkCodeMiddleware, (req, res) => {
  res.send("admin");
});
app.get("/setting", checkCodeMiddleware, (req, res) => {
  res.send("setting");
});
//监听端口
app.listen(9000, () => {
  console.log("express is listen on 9000");
});
